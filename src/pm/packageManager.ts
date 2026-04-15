import { execSync } from "node:child_process";

export type PackageManager = "pnpm" | "yarn" | "npm";

function canRun(cmd: string, args: string[] = ["-v"]): boolean {
  try {
    execSync([cmd, ...args].join(" "), { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Detect best available package manager.
 * Preference order: pnpm → yarn → npm.
 */
export function detectPackageManager(): PackageManager {
  if (canRun("pnpm")) return "pnpm";
  if (canRun("yarn")) return "yarn";
  return "npm";
}

export function getInstallCommand(pm: PackageManager): { command: string; args: string[] } {
  switch (pm) {
    case "pnpm":
      return { command: "pnpm", args: ["install"] };
    case "yarn":
      // yarn classic + modern both support running with no args to install
      return { command: "yarn", args: [] };
    case "npm":
    default:
      return { command: "npm", args: ["install"] };
  }
}

