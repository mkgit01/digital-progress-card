import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const userProgress = [
  { name: "Task 1", progress: 40, period: "weekly" },
  { name: "Task 2", progress: 10, period: "weekly" },
  { name: "Task 3", progress: 70, period: "monthly" },
  { name: "Task 4", progress: 50, period: "monthly" },
  { name: "Task 5", progress: 84, period: "yearly" },
  { name: "Task 6", progress: 90, period: "yearly" },
  { name: "Task 7", progress: 60, period: "weekly" },
  { name: "Task 8", progress: 33, period: "monthly" },
  { name: "Task 9", progress: 20, period: "monthly" },
  { name: "Task 10", progress: 100, period: "yearly" },
  { name: "Task 11", progress: 90, period: "weekly" },
  { name: "Task 12", progress: 60, period: "weekly" },
];

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  const filteredProgress = userProgress.filter(
    (task) => task.period === selectedPeriod
  );
  const hasTasks = filteredProgress.length > 0;
  const chartWidth = Math.max(filteredProgress.length * 150, 750);

  return (
    <div className="place-holder-stat sm:col-span-2 sm:w-4/5 w-11/12 place-items-center max-w-[100%]  p-1">
      {hasTasks ? (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Task Progress ({selectedPeriod})
          </h2>
          <div className="overflow-x-auto scrollbar-hide">
            <div style={{ width: `${chartWidth}px`, height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredProgress}>
                  <defs>
                    <linearGradient
                      id="progressFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#000000"
                    fillOpacity={1}
                    fill="url(#progressFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="select-none grid place-items-center text-center">
          <Link to="/task">
            <div className="add-tsk rounded-full grid place-items-center text-3xl">
              +
            </div>
          </Link>
          No tasks found for this period
        </div>
      )}

      <select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        className="filter mt-4"
        name="filter"
        id="sort"
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default Statistics;
