import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
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
import axios from "axios";

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

const Statistics = ({
  tasks,
  setTaskId,
  setRewards,
  setTotalProgress,
  setTarget,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedTask, setSelectedTask] = useState("");
  const [filteredProgress, setFilteredProgress] = useState([]);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const chartHeight = isSm ? 250 : 300;

  // Automatically select first task when tasks load
  useEffect(() => {
    if (tasks.length > 0 && !selectedTask) {
      setSelectedTask(tasks[0]._id);
    }
  }, [tasks, selectedTask]);

  useEffect(() => {
    if (!selectedTask) return;

    const fetchTaskProgress = async () => {
      try {
        const response = await axios.get(
          `https://digital-progress-card.onrender.com/api/${selectedTask}/progress`
        );
        setTaskId(response.data._id);
        setRewards(response.data.rewards);
        setTotalProgress(response.data.totalProgress);
        setTarget(response.data.target);

        const progressData = getProgressData(response.data, selectedPeriod);

        // If only 1 point, prepend a point at 0 to show line from 0
        const chartData =
          progressData.length === 1
            ? [{ day: "", progress: 0 }, progressData[0]]
            : progressData;

        setFilteredProgress(chartData);
      } catch (error) {
        console.error("Error fetching task progress:", error);
      }
    };

    fetchTaskProgress();
  }, [selectedTask, selectedPeriod]);

  const hasTasks = tasks.length > 0;

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
              tasks.find((t) => t._id === selectedTask)?.name || ""
            }`}
          </Typography>
          {filteredProgress.length === 0 ? (
            <Box
              sx={{ width: "100%", height: chartHeight, ml: { xs: -3, md: 0 } }}
            >
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
            to="/task"
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
        {tasks.length === 0 ? (
          <MenuItem value="">No Tasks</MenuItem>
        ) : (
          tasks.map((task) => (
            <MenuItem key={task._id} value={task._id}>
              {task.name}
            </MenuItem>
          ))
        )}
      </Select>
    </Box>
  );
};

export default Statistics;
