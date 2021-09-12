import { InflowTransaction } from "./models";

export const exportInflowTransactions = async (
  getAccessToken: () => Promise<string>,
  getInflowTransactions: (accessToken: string) => Promise<InflowTransaction[]>,
  transformInflowTransactions: (transactions: InflowTransaction[]) => Promise<string>,
  saveData: (data: string) => Promise<any>
) => {
  const accessToken = await getAccessToken();
  const transactions = await getInflowTransactions(accessToken);
  const data = await transformInflowTransactions(transactions);
  await saveData(data);
  return data;
};