import path from "node:path";
import { execa } from "execa";
import ora from "ora";

export async function installDependencies(projectDir: string, workspaces: string[]) {
  const spinner = ora("Installing dependencies...").start();
  try {
    // Root first (for dev tooling like concurrently)
    await execa("npm", ["install"], { cwd: projectDir, stdio: "inherit" });

    for (const ws of workspaces) {
      const cwd = path.join(projectDir, ws);
      await execa("npm", ["install"], { cwd, stdio: "inherit" });
    }
    spinner.succeed("Dependencies installed");
  } catch (err) {
    spinner.fail("Dependency install failed");
    throw err;
  }
}

