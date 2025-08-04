"use client";

import { Card } from "@repo/ui/card";

export default function P2pTransactions({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    fromUser: string;
    toUser: string;
  }[];
}) {
  console.log("Rendering transactions:", transactions);

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="space-y-4">
        {transactions.map((transaction, idx) => (
          <div key={idx} className="flex justify-between border-b pb-2 pt-2">
            <div>
              <div className="text-sm">
                {transaction.fromUser} → {transaction.toUser}
              </div>
              <div className="text-slate-600 text-xs">
                {new Date(transaction.time).toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center text-green-700 font-medium">
              + ₹{transaction.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
