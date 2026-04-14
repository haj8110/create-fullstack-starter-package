#!/usr/bin/env node

import chalk from "chalk";
import { main } from "../dist/index.js";

main(process.argv).catch((err) => {
  console.error(chalk.red("\n❌ Error\n"));
  console.error(err?.stack || err);
  process.exitCode = 1;
});