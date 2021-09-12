import chalk from "chalk";
import { addMonths, startOfDay } from "date-fns";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";
import { readSecureString, readString, readFromOptions } from "./read-string";

const getPersistedAccessToken = () => {
  const persistedToken = process.env.INFLOW_ACCESS_TOKEN;
  if (!persistedToken) return null;
  const decoded = jwt.decode(persistedToken) as jwt.JwtPayload;
  if (new Date(decoded.exp * 1000) < new Date()) return null;
  return persistedToken;
};

const persistAccessToken = async (token: string) => {
  const envFileName = path.resolve(__dirname, "../.env");
  return fs.appendFile(envFileName, `\nINFLOW_ACCESS_TOKEN=${token}\n`);
};

export const getAccessTokenFromConsole = async () => {
  const persistedToken = getPersistedAccessToken();
  return (
    persistedToken ||
    readSecureString("Provide your Access Token: ").then((token) =>
      persistAccessToken(token).then(() => token)
    )
  );
};

export const getDateRangeFromConsole = async () => {
  const index = await readFromOptions(
    `What date range would you like to filter by? ${chalk.underline(
      "(Last 30 Days)"
    )}`,
    ["Last 30 Days", "All", "Custom"]
  );
  if (index === 0) {
    return {
      startDate: startOfDay(addMonths(new Date(), -1)).toISOString(),
      endDate: new Date().toISOString(),
    };
  } else if (index === 1) {
    return { startDate: null, endDate: null };
  } else {
    return {
      startDate: await readString("Enter Start Date (YYYY-MM-DD): "),
      endDate: await readString("Enter End Date (YYYY-MM-DD): "),
    };
  }
};
