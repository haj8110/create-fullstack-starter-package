import path from "node:path";
import fs from "fs-extra";

export async function writeRootPackageJson(args: {
  projectDir: string;
  projectName: string;
}) {
  const pkgPath = path.join(args.projectDir, "package.json");

  // Don't overwrite if the user is generating into an existing project root.
  const exists = await fs.pathExists(pkgPath);
  if (exists) return;

  const pkg = {
    name: args.projectName,
    private: true,
    version: "0.0.0",
    devDependencies: {
      concurrently: "^9.2.1"
    },
    scripts: {
      dev: "concurrently -n backend,frontend -c blue,magenta \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
      "dev:backend": "npm run dev --prefix backend",
      "dev:frontend": "npm run dev --prefix frontend",
      build: "npm run build --prefix backend && npm run build --prefix frontend",
      lint: "npm run lint --prefix backend && npm run lint --prefix frontend"
    }
  };

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
}

