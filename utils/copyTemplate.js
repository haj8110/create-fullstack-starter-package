import fs from "fs-extra";
import path from "path";

export const copyTemplate = async (template, target) => {
  const templatePath = path.join(process.cwd(), "templates", template);
  const destPath = path.join(target, template);

  await fs.copy(templatePath, destPath);
};