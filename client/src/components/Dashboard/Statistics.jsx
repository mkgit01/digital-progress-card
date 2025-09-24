import React, { useEffect, useState } from "react";
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
import {
  Box,
  Typography,
  Select,
  MenuItem,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

// Example static tasks array (to be replaced by API response later)
const tasks = [
  { taskId: "id6543657", taskName: "Task 1" },
  { taskId: "id9876543", taskName: "Task 2" },
  { taskId: "id1234567", taskName: "Task 3" },
];

// Example task progress data (each task has ONE type of progress array)
const taskProgressData = {
  id6543657: {
    taskId: "id6543657",
    taskName: "Task 1",
    createdDate: "dummy date",
    updatedDate: "dummy yummy date",
    weeklyProgress: [
      { day: "2025-09-01", progress: 10 },
      { day: "2025-09-08", progress: 50 },
      { day: "2025-09-15", progress: 15 },
      { day: "2025-09-22", progress: 40 },
      { day: "2025-09-29", progress: 90 },
      { day: "2025-10-06", progress: 65 },
      { day: "2025-10-13", progress: 85 },
    ],

    monthlyProgress: [
      { day: "2025-01-01", progress: 84 },
      { day: "2025-02-01", progress: 90 },
      { day: "2025-03-01", progress: 65 },
      { day: "2025-04-01", progress: 70 },
      { day: "2025-05-01", progress: 55 },
      { day: "2025-06-01", progress: 95 },
      { day: "2025-07-01", progress: 78 },
      { day: "2025-08-01", progress: 60 },
      { day: "2025-09-01", progress: 88 },
      { day: "2025-10-01", progress: 72 },
      { day: "2025-11-01", progress: 81 },
      { day: "2025-12-01", progress: 93 },
    ],

    yearlyProgress: [
      { day: "2022-01-01", progress: 45 },
      { day: "2023-01-01", progress: 55 },
      { day: "2024-01-01", progress: 60 },
      { day: "2025-01-01", progress: 80 },
      { day: "2026-01-01", progress: 92 },
    ],
  },
  id9876543: {
    taskId: "id9876543",
    taskName: "Task 2",
    createdDate: "dummy date",
    updatedDate: "dummy yummy date",
    weeklyProgress: [
      { day: "2022-01-01", progress: 20 },
      { day: "2022-01-08", progress: 50 },
      { day: "2022-01-015", progress: 75 },
    ],
  },
  id1234567: {
    taskId: "id1234567",
    taskName: "Task 3",
    createdDate: "dummy date",
    updatedDate: "dummy yummy date",
    monthlyProgress: [
      { day: "2022-02-01", progress: 84 },
      { day: "2022-03-01", progress: 90 },
      { day: "2022-04-01", progress: 65 },
    ],
  },
};


// Utility to get correct progress array
const getProgressData = (task, period) => {
  if (!task) return [];
  switch (period) {
    case "weekly":
      return task.weeklyProgress || [];
    case "monthly":
      return task.monthlyProgress || [];
    case "yearly":
      return task.yearlyProgress || [];
    default:
      return [];
  }
};

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedTask, setSelectedTask] = useState(tasks[0]?.taskId || "");

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const task = taskProgressData[selectedTask];
  const filteredProgress = getProgressData(task, selectedPeriod);
  const hasTasks = tasks.length > 0;

  const chartHeight = isSm ? 250 : 300;

  return (
    <Box
      sx={{
        px: { xs: 0, md: 2 },
        pb: { xs: 0, md: 2 },
        width: "100%",
        mx: "auto",
        textAlign: "center",
      }}
    >
      {hasTasks ? (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {`Task Progress (${selectedPeriod}) - ${
              tasks.find((t) => t.taskId === selectedTask)?.taskName || ""
            }`}
          </Typography>
          {filteredProgress.length === 0 ? (
            <Box sx={{ width: "100%", height: chartHeight, ml: { xs: -3, md: 0 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredProgress}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} />

                  {filteredProgress.length === 0 && (
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#888"
                      fontSize={16}
                    >
                      No progress found for this period
                    </text>
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Box
              sx={{ width: "100%", height: chartHeight, ml: { xs: -3, md: 0 } }}
            >
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
                      <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#1976d2"
                    fillOpacity={1}
                    fill="url(#progressFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 5,
            px: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            No tasks found
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Try adding one to see your progress.
          </Typography>

          <Fab
            color="primary"
            component={Link}
            to="/tasks"
            sx={{ mt: 3 }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Box>
      )}

      {/* Period Selector */}
      <Select
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
        sx={{ mt: 3, minWidth: 120, mr: 2 }}
        size="small"
      >
        <MenuItem value="weekly">Weekly</MenuItem>
        <MenuItem value="monthly">Monthly</MenuItem>
        <MenuItem value="yearly">Yearly</MenuItem>
      </Select>

      {/* Task Selector */}
      <Select
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
        sx={{ mt: 3, minWidth: 160 }}
        size="small"
      >
        {tasks.map((task) => (
          <MenuItem key={task.taskId} value={task.taskId}>
            {task.taskName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Statistics;
