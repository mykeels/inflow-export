import { promises as fs, existsSync } from "fs";
import path from "path";

export const createEnvFile = async () => {
  const envFileName = path.resolve(__dirname, "../.env");

  if (!existsSync(envFileName)) {
    await fs.writeFile(envFileName, "", "utf8");
  }
};
