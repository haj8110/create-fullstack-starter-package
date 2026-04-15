import path from "node:path";
import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import validatePackageName from "validate-npm-package-name";
import fs from "fs-extra";
import { fileURLToPath } from "node:url";

import { copyTemplateDir } from "../fs/copyTemplateDir.js";
import { ensureEmptyDirOrThrow, resolveProjectDir } from "../fs/projectDir.js";
import { installDependencies } from "../pm/installDependencies.js";
import { writeRootPackageJson } from "../project/writeRootPackageJson.js";
import { writeBackendEnv } from "../project/writeBackendEnv.js";

export type Language = "ts" | "js";
export type Database = "mongodb" | "postgres";

function resolveTemplatesDir(): string {
  // In the published package we run the bundled file at `dist/index.js`.
  // Resolve templates relative to that location: `dist/../templates`.
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../templates");
}

export type CreateOptions = {
  ts?: boolean;
  js?: boolean;
  db?: string;
  auth?: boolean;
  install?: boolean;
  force?: boolean;
  debug?: boolean;
};

async function resolveTemplateName(args: {
  templatesDir: string;
  preferred: string;
  fallback: string;
}) {
  const preferredPath = path.join(args.templatesDir, args.preferred);
  if (await fs.pathExists(preferredPath)) return args.preferred;
  return args.fallback;
}

export async function createAction(dirArg: string | undefined, options: CreateOptions) {
  const templatesDir = resolveTemplatesDir();
  if (options.debug) {
    console.log(`[debug] templatesDir=${templatesDir}`);
  }

  const initialDir = dirArg ?? ".";
  const projectDir = resolveProjectDir(process.cwd(), initialDir);
  const projectName = path.basename(projectDir);

  const nameCheck = validatePackageName(projectName);
  if (!nameCheck.validForNewPackages) {
    const errs = [...(nameCheck.errors ?? []), ...(nameCheck.warnings ?? [])];
    throw new Error(
      `Invalid project directory name "${projectName}".\n` +
        errs.map((e) => `- ${e}`).join("\n")
    );
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose language:",
      choices: [
        { name: "TypeScript", value: "ts" },
        { name: "JavaScript (ESM)", value: "js" }
      ],
      when: !options.ts && !options.js,
      default: "ts"
    },
    {
      type: "list",
      name: "database",
      message: "Database:",
      choices: [
        { name: "MongoDB", value: "mongodb" },
        { name: "PostgreSQL", value: "postgres" }
      ],
      when: !options.db,
      default: "mongodb"
    }
  ]);

  const language: Language = options.ts ? "ts" : options.js ? "js" : answers.language;
  const database: Database =
    options.db === "mongodb" || options.db === "postgres" ? (options.db as Database) : answers.database;

  const spinner = ora("Creating project...").start();
  try {
    await fs.ensureDir(projectDir);
    await ensureEmptyDirOrThrow(projectDir, { force: Boolean(options.force) });

    const backendTemplate = language === "ts" ? "backend-ts" : "backend-js";
    const frontendTemplate = language === "ts" ? "frontend-ts" : "frontend-js";

    const resolvedBackendTemplate = await resolveTemplateName({
      templatesDir,
      preferred: path.posix.join("base", backendTemplate),
      fallback: backendTemplate
    });

    await copyTemplateDir({
      templatesDir,
      templateName: resolvedBackendTemplate,
      destDir: path.join(projectDir, "backend")
    });
    const backendDir = path.join(projectDir, "backend");
    const backendPkg = path.join(backendDir, "package.json");
    if (!(await fs.pathExists(backendPkg))) {
      const templatePath = path.join(templatesDir, backendTemplate);
      const debugLines = [
        `Backend template copy did not produce ${backendPkg}.`,
        ``,
        `Diagnostics:`,
        `- templatesDir: ${templatesDir}`,
        `- backendTemplate: ${backendTemplate}`,
        `- templatePath exists: ${await fs.pathExists(templatePath)}`,
        `- backendDir exists: ${await fs.pathExists(backendDir)}`
      ];
      try {
        const entries = await fs.readdir(backendDir);
        debugLines.push(`- backendDir entries: ${entries.length ? entries.join(", ") : "(empty)"}`);
      } catch (e: any) {
        debugLines.push(`- backendDir entries: (unreadable: ${e?.code ?? e})`);
      }
      debugLines.push(
        ``,
        `This usually indicates the published package is missing templates/ or the template structure is invalid.`
      );
      throw new Error(debugLines.join("\n"));
    }
    await copyTemplateDir({
      templatesDir,
      templateName: await resolveTemplateName({
        templatesDir,
        preferred: path.posix.join("base", frontendTemplate),
        fallback: frontendTemplate
      }),
      destDir: path.join(projectDir, "frontend")
    });

    await writeRootPackageJson({ projectDir, projectName });
    await writeBackendEnv({ projectDir, database, auth: Boolean(options.auth) });

    if (options.auth) {
      await copyTemplateDir({
        templatesDir,
        templateName: path.posix.join("auth", backendTemplate),
        destDir: path.join(projectDir, "backend")
      });
    }

    spinner.succeed("Project created");

    if (options.install !== false) {
      await installDependencies(projectDir, ["backend", "frontend"]);
    }

    console.log(chalk.green("\n✅ Setup complete!\n"));
    console.log(`cd ${path.relative(process.cwd(), projectDir) || "."}`);
    console.log("npm run dev");
  } catch (err) {
    spinner.fail("Failed to create project");
    throw err;
  }
}

export function createCommand() {
  return new Command("create")
    .description("Create a new fullstack project")
    .argument("[dir]", "project directory name (defaults to current dir)")
    .option("--ts", "use TypeScript templates")
    .option("--js", "use JavaScript templates")
    .option("--db <db>", "database: mongodb | postgres")
    .option("--auth", "include authentication module (JWT)", false)
    .option("--install", "install dependencies", true)
    .option("--no-install", "skip installing dependencies")
    .option("--force", "overwrite target directory if not empty", false)
    .option("--debug", "print debug information", false)
    .action(createAction);
}

