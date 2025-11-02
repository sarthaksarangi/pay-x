"use client";
import { Card } from "@repo/ui/card";
import { Heading } from "@repo/ui/heading";

import { JSX, ReactNode, useMemo, useState } from "react";
import MyBarChart from "../../../components/MyBarChart";
import { Transaction } from "../../../types/types";

const Icon = ({
  children,
  className = "w-6 h-6",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const PlusIcon = (
  props: JSX.IntrinsicAttributes & { children: ReactNode; className?: string }
) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

const MinusIcon = (
  props: JSX.IntrinsicAttributes & { children: ReactNode; className?: string }
) => (
  <Icon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

const ConvertIcon = (
  props: JSX.IntrinsicAttributes & { children: ReactNode; className?: string }
) => (
  <Icon {...props}>
    <polyline points="12 2 12 10" />
    <path d="M18 13v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6" />
    <path d="M4 14l-4 4 4 4" />
    <path d="M20 14l4 4-4 4" />
  </Icon>
);

const DepositIcon = (
  props: JSX.IntrinsicAttributes & { children: ReactNode; className?: string }
) => (
  <Icon {...props}>
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </Icon>
);

const WithdrawIcon = (
  props: JSX.IntrinsicAttributes & { children: ReactNode; className?: string }
) => (
  <Icon {...props}>
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </Icon>
);

const TimeframeTabs = ({
  activeTime,
  setActiveTime,
}: {
  activeTime: string;
  setActiveTime: (t: string) => void;
}) => {
  const timeframes = ["1W", "1M", "3M", "6M", "1Y", "ALL"];
  return (
    <div
      className="flex flex-wrap justify-center mt-4 sm:mt-6 p-1 bg-gray-100 rounded-lg shadow-inner w-full"
      role="tablist"
      aria-label="Timeframe tabs"
    >
      {timeframes.map((time) => (
        <button
          key={time}
          type="button"
          onClick={() => setActiveTime(time)}
          aria-pressed={time === activeTime}
          className={`
            py-1.5 px-2.5 sm:py-2 sm:px-4
            text-xs sm:text-sm
            font-semibold rounded-md
            transition-colors duration-200
            m-0.5 sm:m-1
            flex-1 min-w-[45px] sm:min-w-0 sm:flex-none
            ${
              time === activeTime
                ? "bg-white text-gray-800 shadow"
                : "text-gray-500 hover:text-gray-700"
            }
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

const ActionButton = ({
  icon: IconComponent,
  label,
  color,
  onClick,
}: {
  icon: any;
  label: string;
  color: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 group transition-transform duration-200 hover:scale-105 active:scale-95 min-w-0"
    aria-label={label}
  >
    <div
      className="p-2.5 sm:p-3 rounded-full shadow-md sm:shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-opacity-90"
      style={{ backgroundColor: color }}
    >
      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">
      {label}
    </span>
  </button>
);

const getFilteredTransactions = (
  transactions: Transaction[],
  activeTime: string
) => {
  if (activeTime === "ALL") return transactions;

  const now = new Date();
  let cutoff = new Date(now);

  switch (activeTime) {
    case "1W":
      cutoff.setDate(now.getDate() - 7);
      break;
    case "1M":
      cutoff.setMonth(now.getMonth() - 1);
      break;
    case "3M":
      cutoff.setMonth(now.getMonth() - 3);
      break;
    case "6M":
      cutoff.setMonth(now.getMonth() - 6);
      break;
    case "1Y":
      cutoff.setFullYear(now.getFullYear() - 1);
      break;
  }

  return transactions.filter((txns) => new Date(txns.time) >= cutoff);
};

const Home = ({
  name,
  transactions,
}: {
  name: string;
  transactions: Transaction[];
}) => {
  const [activeTime, setActiveTime] = useState("3M");

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(transactions, activeTime),
    [transactions, activeTime]
  );

  // Currency formatter
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }),
    []
  );

  const portfolioTotal = useMemo(() => {
    return filteredTransactions.reduce(
      (sum, t) => sum + (t.amount || 0) / 100,
      0
    );
  }, [filteredTransactions]);

  const previousTotal = useMemo(() => {
    if (activeTime === "ALL") return 0;

    const now = new Date();
    let cutoff = new Date(now);

    switch (activeTime) {
      case "1W":
        cutoff.setDate(now.getDate() - 7);
        break;
      case "1M":
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        cutoff.setMonth(now.getMonth() - 3);
        break;
      case "6M":
        cutoff.setMonth(now.getMonth() - 6);
        break;
      case "1Y":
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
    }

    const windowLength = now.getTime() - cutoff.getTime();
    const prevStart = new Date(cutoff.getTime() - windowLength);
    const prevEnd = cutoff;

    const prevTransactions = transactions.filter((t) => {
      const dt = new Date(t.time).getTime();
      return dt >= prevStart.getTime() && dt < prevEnd.getTime();
    });

    return prevTransactions.reduce((sum, t) => sum + (t.amount || 0) / 100, 0);
  }, [transactions, activeTime]);

  const percentChange =
    previousTotal > 0
      ? ((portfolioTotal - previousTotal) / previousTotal) * 100
      : null;

  const changeLabel =
    percentChange === null
      ? "—"
      : `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(1)}%`;

  const changeColor =
    percentChange === null
      ? "text-gray-500"
      : percentChange >= 0
        ? "text-green-600"
        : "text-red-600";

  const actions = [
    { label: "Buy", icon: PlusIcon, color: "#6a51a6" },
    { label: "Sell", icon: MinusIcon, color: "#6a51a6" },
    { label: "Convert", icon: ConvertIcon, color: "#6a51a6" },
    { label: "Deposit", icon: DepositIcon, color: "#6a51a6" },
    { label: "Withdraw", icon: WithdrawIcon, color: "#6a51a6" },
  ];

  return (
    <div className="w-full">
      <Heading heading={`Good afternoon, ${name}`} />
      <Card title={"Portfolio Value"}>
        {/* Portfolio Value Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 mb-4">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
            {currencyFormatter.format(portfolioTotal)}
          </p>
          <span
            className={`text-sm font-medium ${changeColor} self-start sm:self-auto`}
          >
            {changeLabel}
          </span>
        </div>

        {/* Chart Section with proper responsive container */}
        {filteredTransactions.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500">
            No transactions in this period.
          </div>
        ) : (
          <div className="w-full my-4 sm:my-6">
            <MyBarChart
              transactions={filteredTransactions}
              activeTime={activeTime}
            />
          </div>
        )}

        {/* Timeframe Tabs */}
        <TimeframeTabs activeTime={activeTime} setActiveTime={setActiveTime} />

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:flex lg:justify-between lg:items-start mt-6 sm:mt-8 mb-6 sm:mb-8">
          {actions.map((action) => (
            <ActionButton key={action.label} {...action} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-purple-50 rounded-lg shadow-inner">
          <span className="text-xs sm:text-sm md:text-base font-semibold text-purple-800 leading-snug">
            Stay ahead—track your portfolio growth in real time!
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </Card>
    </div>
  );
};

export default Home;
