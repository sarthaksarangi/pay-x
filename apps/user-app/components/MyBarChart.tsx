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
import { AnimatePresence, motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

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

const MyBarChart = ({
  transactions,
  activeTime,
}: {
  transactions: {
    id: number;
    time: Date;
    amount: number;
    status: "Success" | "Processing" | "Failure";
    provider: string;
  }[];
  activeTime: string;
}) => {
  const [innerWidth, setInnerWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  let labels = [];
  let dataValues = [];

  if (activeTime == "1W" || activeTime === "1M") {
    // Daily aggregation
    const dailyTotals: any = {};
    transactions.forEach((txn) => {
      const dateKey = new Date(txn.time).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      dailyTotals[dateKey] = (dailyTotals[dateKey] || 0) + txn.amount / 100;
    });

    labels = Object.keys(dailyTotals);
    dataValues = Object.values(dailyTotals);
  } else {
    const labelsAll = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
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

    labels = labelsAll;
    dataValues = monthlyTotals;
  }

  const data = {
    labels: labels,

    datasets: [
      {
        label: "Transaction Volume (₹)",
        data: dataValues,
        backgroundColor: "rgba(106, 81, 166, 0.5)",
        borderColor: "rgba(106, 81, 166, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: innerWidth < 640 ? 1.2 : innerWidth < 1024 ? 1.8 : 2.2,
    animation: {
      duration: 800,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: true,
        position: innerWidth < 640 ? "bottom" : "top",
        labels: {
          boxWidth: innerWidth < 640 ? 12 : 15,
          padding: innerWidth < 640 ? 8 : 15,
          font: {
            size: innerWidth < 640 ? 10 : innerWidth < 1024 ? 11 : 12,
          },
        },
      },
      title: {
        display: true,
        text:
          innerWidth < 640 ? "Transactions" : "Monthly Transactions Overview",
        font: {
          size: innerWidth < 640 ? 12 : innerWidth < 1024 ? 14 : 16,
          weight: "bold",
        },
        padding: {
          top: innerWidth < 640 ? 5 : 10,
          bottom: innerWidth < 640 ? 10 : 15,
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        padding: innerWidth < 640 ? 8 : 12,
        titleFont: {
          size: innerWidth < 640 ? 11 : 12,
        },
        bodyFont: {
          size: innerWidth < 640 ? 10 : 11,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: innerWidth < 640 ? 9 : innerWidth < 1024 ? 10 : 11,
          },
          padding: innerWidth < 640 ? 4 : 8,
          maxTicksLimit: innerWidth < 640 ? 5 : 8,
        },
        title: {
          display: innerWidth >= 640,
          text: "Amount (₹)",
          font: {
            size: innerWidth < 1024 ? 11 : 12,
          },
        },
        grid: {
          display: true,
          drawBorder: true,
        },
      },
      x: {
        ticks: {
          font: {
            size: innerWidth < 640 ? 9 : innerWidth < 1024 ? 10 : 11,
          },
          maxRotation: innerWidth < 640 ? 45 : 0,
          minRotation: innerWidth < 640 ? 45 : 0,
          padding: innerWidth < 640 ? 4 : 8,
          autoSkip: true,
          maxTicksLimit: innerWidth < 640 ? 8 : 12,
        },
        title: {
          display: innerWidth >= 640,
          text: activeTime === "1W" || activeTime === "1M" ? "Date" : "Month",
          font: {
            size: innerWidth < 1024 ? 11 : 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTime}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <div className="relative w-full" style={{ minHeight: "250px" }}>
            <Bar data={data} options={options} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MyBarChart;
