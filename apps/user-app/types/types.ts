export interface Transaction {
  id: number;
  time: Date;
  amount: number;
  status: "Success" | "Processing" | "Failure";
  provider: string;
}
