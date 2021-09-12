import chalk from "chalk";
import { addMonths, startOfDay } from "date-fns";
import { readSecureString, readString, readFromOptions } from "./read-string";

export const getAccessTokenFromConsole = async () =>
  readSecureString("Provide your Access Token: ");

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


