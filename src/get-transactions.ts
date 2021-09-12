import axios from "axios";
import { InflowTransaction } from "./core/models";

const INFLOW_API_ROOT_URL = "https://api.inflow.finance/v1";

export const getTransactionsInDateRange = async (
  accessToken: string,
  options?: {
    inflowApiRootUrl?: string,
    startDate: string | Date,
    endDate: string | Date,
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
      .then((data: { count: number, transactions: InflowTransaction[] }) => {
        return data.transactions.length
          ? getTransactions(page + 1, transactions.concat(data.transactions))
          : transactions.concat(data.transactions);
      });
  }
  return getTransactions();
};
