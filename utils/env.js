const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const dotenvFilePath = path.resolve(process.cwd(), `.env.test`);

if (fs.existsSync(dotenvFilePath)) {
  dotenv.config({ path: dotenvFilePath });
} else {
  // eslint-disable-next-line no-console
  console.error(".env.test file not found");
  process.exit(1);
}
