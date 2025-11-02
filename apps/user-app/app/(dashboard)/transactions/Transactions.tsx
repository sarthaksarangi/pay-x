"use client";
import { useState } from "react";
import { Heading } from "@repo/ui/heading";
import OnRampTransactions from "../../../components/OnRampTransactions";

const Transactions = ({
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
  const [status, setStatus] = useState("all");
  const filterTransactions = transactions.filter((txn) => {
    if (status === "all") {
      return true;
    }
    return txn.status === status;
  });
  console.log(filterTransactions);

  const baseClasses =
    "inline-flex items-center shadow-sm transition duration-100 ease-in-out hover:shadow-md rounded-full px-6 py-2 text-sm font-semibold cursor-pointer mr-4";
  const inactiveClasses =
    "bg-white text-gray-600 inset-ring inset-ring-gray-400/20";
  const activeClasses = "bg-[#6a51a6] text-white shadow-lg";

  return (
    <div className="w-full">
      <Heading heading="Transactions" />
      <div className="mb-8 ml-3">
        <button
          onClick={() => setStatus("all")}
          className={`${baseClasses} ${
            status === "all" ? activeClasses : inactiveClasses
          } mr-4`}
        >
          History
        </button>
        <button
          onClick={() => setStatus("Processing")}
          className={`${baseClasses} ${
            status === "Processing" ? activeClasses : inactiveClasses
          }`}
        >
          Scheduled
        </button>
      </div>
      <OnRampTransactions transactions={filterTransactions} />
    </div>
  );
};

export default Transactions;
