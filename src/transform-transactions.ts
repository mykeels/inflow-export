import csvStringify from "csv-stringify";

export const transformInflowTransactionsToCSV = async (
  transactions
): Promise<string> =>
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
  );
