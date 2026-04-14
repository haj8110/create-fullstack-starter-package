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
    filter: (src) => !src.endsWith(`${path.sep}node_modules`) && !src.includes(`${path.sep}node_modules${path.sep}`)
  });
}

