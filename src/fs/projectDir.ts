import path from "node:path";
import fs from "fs-extra";

export function resolveProjectDir(cwd: string, dirArg: string): string {
  return path.resolve(cwd, dirArg);
}

export async function ensureEmptyDirOrThrow(
  dir: string,
  opts: { force: boolean }
): Promise<void> {
  const entries = await fs.readdir(dir).catch((err: any) => {
    if (err?.code === "ENOENT") return [];
    throw err;
  });

  if (entries.length === 0) return;

  if (!opts.force) {
    throw new Error(
      `Target directory is not empty: ${dir}\n` +
        `Use --force to proceed (files may be overwritten).`
    );
  }
}

