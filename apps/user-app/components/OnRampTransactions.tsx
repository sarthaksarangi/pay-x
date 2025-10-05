import { Card } from "@repo/ui/card";
import { IndianRupee } from "lucide-react";

const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <div className="mb-4">
      <Card title="Recent Transactions">
        {transactions.map((transaction) => (
          <div className="flex justify-between" key={transaction.id}>
            <div className="flex items-center gap-2">
              <div className="">
                <IndianRupee strokeWidth={2} size={20} />
              </div>
              <div className="">
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {transaction.time.toDateString()}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {transaction.amount / 100}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default OnRampTransactions;
