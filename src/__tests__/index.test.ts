import csvStringify from "csv-stringify";
import { expect } from "chai";

import { exportInflowTransactions } from "../core";

describe("core", () => {
  it("should pass", async () => {
    const data = await exportInflowTransactions(
      async () => "",
      async () => [
        {
          summary: "Transfer to Khadija",
          debit: 5000,
          transactionInitDate: "2021-09-01T01:00:00",
          bankName: "Demo Bank",
          account: "Saving",
        } as any,
        {
          summary: "Transfer to Kabiru",
          debit: 5000,
          transactionInitDate: "2021-09-02T01:00:00",
          bankName: "Test Bank",
          account: "Current",
        } as any,
      ],
      async (transactions) =>
        new Promise((resolve, reject) =>
          csvStringify(
            transactions.map((t) => [
              t.summary,
              t.debit,
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
      async (data) => {}
    );
    expect(data).to.deep.equal(
      "Transfer to Khadija,5000,2021-09-01T00:00:00.000Z,Demo Bank,Saving\nTransfer to Kabiru,5000,2021-09-02T00:00:00.000Z,Test Bank,Current\n"
    );
  });
});
