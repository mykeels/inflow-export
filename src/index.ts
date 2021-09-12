import dotenv from "dotenv";
import {
  getAccessTokenFromConsole,
  getDateRangeFromConsole,
} from "./get-params";

import { exportInflowTransactions } from "./core";
import { getTransactionsInDateRange } from "./get-transactions";
import { transformInflowTransactionsToCSV } from "./transform-transactions";
import { saveToCSVFile } from "./save-transactions";
import { createEnvFile } from "./create-env";

dotenv.config();

if (require.main === module) {
  (async () => {
    try {
      await createEnvFile();
      await exportInflowTransactions(
        getAccessTokenFromConsole,
        async (accessToken: string) => {
          const { startDate, endDate } = await getDateRangeFromConsole();
          return getTransactionsInDateRange(accessToken, {
            startDate,
            endDate,
          });
        },
        transformInflowTransactionsToCSV,
        saveToCSVFile
      );
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}

export * from "./core";
export * from "./core/models";
export * from "./get-transactions";
export * from "./transform-transactions";
