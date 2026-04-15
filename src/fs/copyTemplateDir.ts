import fs from "fs-extra";
import path from "node:path";

export async function copyTemplateDir(args: {
  templatesDir: string;
  templateName: string;
  destDir: string;
}) {
  const templatePath = path.join(args.templatesDir, args.templateName);

  const exists = await fs.pathExists(templatePath);
  if (!exists) {
    throw new Error(`Template not found: ${args.templateName}`);
  }

  await fs.copy(templatePath, args.destDir, {
    overwrite: true,
    errorOnExist: false,
    // Important: templates are often *located under* a `node_modules/` path when executed via `npx`.
    // We only want to ignore `node_modules` that are *inside the template itself*.
    filter: (src) => {
      const rel = path.relative(templatePath, src);
      if (!rel) return true;
      const parts = rel.split(path.sep);
      return !parts.includes("node_modules");
    }
  });
}

