import path from "node:path";
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";
import type { PackageManager } from "./packageManager.js";
import { getInstallCommand } from "./packageManager.js";

export async function installDependencies(args: {
  projectDir: string;
  workspaces: string[];
  pm: PackageManager;
}) {
  console.log(chalk.cyanBright(`\n📦 Installing dependencies using ${args.pm}...\n`));
  const spinner = ora("Installing dependencies...").start();
  try {
    const { command, args: installArgs } = getInstallCommand(args.pm);

    // Root first (for dev tooling like concurrently)
    await execa(command, installArgs, { cwd: args.projectDir, stdio: "inherit" });

    for (const ws of args.workspaces) {
      const cwd = path.join(args.projectDir, ws);
      await execa(command, installArgs, { cwd, stdio: "inherit" });
    }
    spinner.succeed("✅ Dependencies installed successfully!");
  } catch (err) {
    spinner.fail("❌ Installation failed. Please run install manually.");
    throw err;
  }
}

