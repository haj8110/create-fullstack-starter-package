import path from "node:path";
import fs from "fs-extra";
import type { Database } from "../commands/create.js";

export async function writeBackendEnv(args: { projectDir: string; database: Database; auth: boolean }) {
  const backendDir = path.join(args.projectDir, "backend");
  const envExamplePath = path.join(backendDir, ".env.example");

  // Defensive: if template copy failed or user is generating into a custom layout,
  // ensure the backend directory exists before writing env files.
  await fs.ensureDir(backendDir);

  const baseContent =
    args.database === "mongodb"
      ? `PORT=5000\nMONGODB_URI=mongodb://localhost:27017/${path.basename(args.projectDir)}\n`
      : `PORT=5000\nDATABASE_URL=postgresql://postgres:postgres@localhost:5432/${path.basename(args.projectDir)}\n`;

  const authContent = args.auth
    ? `\nJWT_SECRET=change-me\nJWT_EXPIRES_IN=1h\nBCRYPT_SALT_ROUNDS=10\n`
    : "";

  await fs.writeFile(envExamplePath, `${baseContent}${authContent}`, { encoding: "utf8" });
}

