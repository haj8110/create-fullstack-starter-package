import { execa } from "execa";

export const installDeps = async (projectPath) => {
  await execa("npm", ["install"], {
    cwd: projectPath,
    stdio: "inherit"
  });
};