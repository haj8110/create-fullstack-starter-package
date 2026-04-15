import { Command } from "commander";
import chalk from "chalk";
import { createAction, createCommand } from "./commands/create.js";

export async function runCli(argv: string[]) {
  const program = new Command()
    .name("create-fullstack-starter")
    .description("Scaffold a production-grade fullstack starter (Node.js + React).")
    .addHelpText(
      "beforeAll",
      chalk.cyanBright("\ncreate-fullstack-starter\n\n")
    )
    .version("0.0.0", "-v, --version", "print the version"); // overridden by package manager at runtime

  // Default behavior: `create-fullstack-starter [dir]` scaffolds immediately.
  program
    .argument("[dir]", "project directory name")
    .option("--ts", "use TypeScript templates")
    .option("--js", "use JavaScript templates")
    .option("--db <db>", "database: mongodb | postgres")
    .option("--auth", "include authentication module (JWT)", false)
    .option("--install", "install dependencies", true)
    .option("--no-install", "skip installing dependencies")
    .option("--force", "overwrite target directory if not empty", false)
    .option("--debug", "print debug information", false)
    .action(createAction);

  // Also provide explicit subcommand for discoverability.
  program.addCommand(createCommand());

  await program.parseAsync(argv);
}

