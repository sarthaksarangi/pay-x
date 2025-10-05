"use client";
import { Card } from "@repo/ui/card";
import { Heading } from "@repo/ui/heading";

import { JSX, ReactNode, useState } from "react";
import { MyBarChart } from "../../../components/MyBarChart";

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

const TimeframeTabs = ({ activeTime, setActiveTime }: any) => {
  const timeframes = ["1W", "1M", "3M", "6M", "1Y", "ALL"];
  return (
    <div className="flex flex-wrap justify-center mt-6 p-1 bg-gray-100 rounded-lg shadow-inner w-full md:w-auto mx-auto">
      {timeframes.map((time) => (
        <button
          key={time}
          onClick={() => setActiveTime(time)}
          className={`
            py-1 px-3
            text-xs md:text-sm
            font-semibold rounded-md
            transition-colors duration-200
            m-1
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

const ActionButton = ({ icon: IconComponent, label, color }: any) => (
  <div
    className={`
      flex flex-col items-center
      flex-shrink-0
      w-1/5 md:w-1/6 lg:w-auto
      group cursor-pointer
      transition-transform duration-200
      hover:scale-[1.02]
    `}
  >
    <div
      className={`p-3 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-opacity-90`}
      style={{ backgroundColor: color }}
    >
      <IconComponent className="w-6 h-6 text-white" />
    </div>
    <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
      {label}
    </span>
  </div>
);

const Home = ({
  name,
  transactions,
}: {
  name: string;
  transactions: {
    id: number;
    time: Date;
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
  }[];
}) => {
  const [activeTime, setActiveTime] = useState("3M");
  const actions = [
    { label: "Buy", icon: PlusIcon, color: "#6a51a6" },
    { label: "Sell", icon: MinusIcon, color: "#6a51a6" },
    { label: "Convert", icon: ConvertIcon, color: "#6a51a6" },
    { label: "Deposit", icon: DepositIcon, color: "#6a51a6" },
    { label: "Withdraw", icon: WithdrawIcon, color: "#6a51a6" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Heading heading={`Good afternoon, ${name}`} />
      <Card title={"Portfolio Value"}>
        <p className="text-3xl md:text-4xl font-bold mt-1 text-gray-900">
          ₹0.00
        </p>
        <MyBarChart transactions={transactions} />

        <TimeframeTabs activeTime={activeTime} setActiveTime={setActiveTime} />

        <div className="flex flex-wrap justify-between items-start mt-8 mb-8 gap-4">
          {actions.map((action) => (
            <ActionButton key={action.label} {...action} />
          ))}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-purple-50 rounded-lg shadow-inner">
          <span className="text-sm sm:text-base font-semibold text-purple-800 mb-2 sm:mb-0">
            Stay ahead—track your portfolio growth in real time!
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-purple-700"
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
