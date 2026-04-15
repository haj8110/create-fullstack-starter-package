import fs from "fs-extra";
import path from "node:path";

const templates =
  "C:/Users/GNB-0042/AppData/Local/npm-cache/_npx/2c0b9f17d0e039f6/node_modules/@haj8110/create-fullstack-starter/templates";
const src = path.join(templates, "backend-ts");
const dest = "C:/Users/GNB-0042/Documents/test-js/my-app/backend";

await fs.remove("C:/Users/GNB-0042/Documents/test-js/my-app");
await fs.copy(src, dest, { overwrite: true });

console.log("copied package.json?", await fs.pathExists(path.join(dest, "package.json")));

