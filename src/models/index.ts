export interface InflowTransaction {
  account: string;
  accountUser: string;
  bankIcon: string;
  bankName: string;
  benefactor: string;
  channel: string;
  createdAt: string | Date;
  debit: number;
  monoAccountId: string;
  monoTransactionId: string;
  summary: string;
  tag: boolean;
  transactionInitDate: string | Date;
  transactionType: string;
  updatedAt: string | Date;
  _id: string;
}
