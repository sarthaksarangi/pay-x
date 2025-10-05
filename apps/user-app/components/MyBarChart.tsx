"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const MyBarChart = ({
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
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyTotals = new Array(12).fill(0);

  transactions.forEach((txn) => {
    const monthIndex = new Date(txn.time).getMonth(); // 0 = Jan, 11 = Dec
    monthlyTotals[monthIndex] += txn.amount / 100;
  });

  const data = {
    labels: labels,

    datasets: [
      {
        label: "Monthly Transaction Volume (₹)",
        data: monthlyTotals,
        backgroundColor: "rgba(106, 81, 166, 0.5)",
        borderColor: "rgba(106, 81, 166, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Monthly Transactions Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
};
