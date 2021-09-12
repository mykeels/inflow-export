import axios from "axios";
import chalk from "chalk";
import csvStringify from "csv-stringify";
import { addMonths, startOfDay } from "date-fns";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

import { InflowTransaction } from "./core/models";
import { exportInflowTransactions } from "./core";
import { readSecureString, readString, readFromOptions } from "./read-string";

const INFLOW_API_ROOT_URL = "https://api.inflow.finance/v1";

const getAccessTokenFromConsole = async () =>
  readSecureString("Provide your Access Token: ");

const getDateRangeFromConsole = async () => {
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

const getInflowTransactionsInDateRange = async (
  accessToken: string,
  options?: {
    inflowApiRootUrl?: string;
    startDate: string | Date;
    endDate: string | Date;
  }
) => {
  const root = options?.inflowApiRootUrl || INFLOW_API_ROOT_URL;
  const query = new URLSearchParams({
    ...(options?.startDate
      ? { after: new Date(options?.startDate).toISOString() }
      : {}),
    ...(options?.endDate
      ? { before: new Date(options?.endDate).toISOString() }
      : {}),
  }).toString();
  function getTransactions(page = 1, transactions: InflowTransaction[] = []) {
    return axios
      .get(`${root}/finances/transactions?limit=15&page=${page}&${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((data: { count: number; transactions: InflowTransaction[] }) => {
        return data.transactions.length
          ? getTransactions(page + 1, transactions.concat(data.transactions))
          : transactions.concat(data.transactions);
      });
  }
  return getTransactions();
};

if (require.main === module) {
  (async () => {
    exportInflowTransactions(
      getAccessTokenFromConsole,
      async (accessToken: string) => {
        const { startDate, endDate } = await getDateRangeFromConsole();
        return getInflowTransactionsInDateRange(accessToken, {
          startDate,
          endDate,
        });
      },
      (transactions) =>
        new Promise((resolve, reject) =>
          csvStringify(
            transactions.map((t) => [
              t.summary,
              Number(t.debit) / 100,
              new Date(t.transactionInitDate)?.toISOString(),
              t.bankName,
              t.account,
            ]),
            (err, input: string) => {
              if (err) reject(err);
              else resolve(input);
            }
          )
        ),
      async (data) => {
        const d = new Date();
        const filename = `inflow-${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}.csv`;
        const filepath = path.join(os.homedir(), "/Documents", filename);
        console.log(`Exported to ${filepath}`);
        return fs.writeFile(
          filepath,
          data,
          "utf8"
        );
      }
    );
  })();
}
