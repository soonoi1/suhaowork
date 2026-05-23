import { execFileSync } from "node:child_process";

const status = execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim();

if (status) {
  console.error("Cannot deploy because there are uncommitted local changes:");
  console.error(status);
  console.error("");
  console.error("Commit your changes first, then run `npm run deploy` again.");
  process.exit(1);
}

