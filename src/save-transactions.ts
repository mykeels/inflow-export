import { promises as fs } from "fs";
import os from "os";
import path from "path";

export const saveToCSVFile = async (data: string) => {
  const d = new Date();
  const filename = `inflow-${d.getFullYear()}-${
    d.getMonth() + 1
  }-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.csv`;
  const filepath = path.join(os.homedir(), "/Documents", filename);
  console.log(`Exported to ${filepath}`);
  return fs.writeFile(filepath, data, "utf8");
};
