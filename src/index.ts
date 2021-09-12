import {
  getAccessTokenFromConsole,
  getDateRangeFromConsole,
} from "./get-params";

import { exportInflowTransactions } from "./core";
import { getTransactionsInDateRange } from "./get-transactions";
import { transformInflowTransactionsToCSV } from "./transform-transactions";
import { saveToCSVFile } from "./save-transactions";

if (require.main === module) {
  (async () => {
    exportInflowTransactions(
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
  })();
}
