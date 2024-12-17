export type StatusType = "all" | "success" | "pending" | "failed";

export interface ITransaction {
  id: number;
  date: string;
  amount: number;
  description: string;
  status: StatusType;
}
