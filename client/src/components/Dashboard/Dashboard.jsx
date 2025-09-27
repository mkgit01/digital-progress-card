import { useState } from "react";
import Statistics from "./Statistics";
import RewardProgress from "./RewardProgress";
import { Box, Button, TextField, Grid, Stack } from "@mui/material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useSnackbar } from "../../context/GlobalSnackbarProvider";
import useAuth from "../Auth/useAuth";
import { useEffect } from "react";
import { getTasks } from "../../services/api";

const Dashboard = () => {
  const [progressValue, setProgressValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [target, setTarget] = useState(0);
  const auth = getAuth();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const userId = user ? user.uid : null;

  const fetchUserTasks = async () => {
    try {
      const data = await getTasks(userId);
      setTasks(data);
      // console.log("Fetched tasks:", data);
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to load tasks",
        "error"
      );
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserTasks();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!progressValue) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in!");
        return;
      }

      // Firebase UID
      const userId = user.uid;

      const token = await user.getIdToken();

      const response = await axios.post(
        `http://localhost:5000/api/${taskId}/progress`,
        { value: Number(progressValue), userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProgressValue("");
      // console.log(response);
      showSnackbar(
        response?.data?.msg || "Progress added successfully",
        "success"
      );
    } catch (err) {
      console.error(err);
      showSnackbar(err.response.data.msg || "Error adding progress", "error");
    }
  };

  return (
    <Stack width={"100%"} minWidth={"100vw"} py={4}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 8 }}>
          <Statistics
            tasks={tasks}
            setTaskId={setTaskId}
            setRewards={setRewards}
            setTotalProgress={setTotalProgress}
            setTarget={setTarget}
          />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: { xs: "250px", md: "500px" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                label="Total work done today"
                size="small"
                type="number"
                value={progressValue}
                onChange={(e) => setProgressValue(e.target.value)}
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <RewardProgress
            rewards={rewards}
            totalProgress={totalProgress}
            target={target}
          />
        </Grid>
      </Grid>

      {/* Mobile form */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            mt: 3,
            width: "100%",
            px: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Total work done today"
            size="small"
            type="number"
            value={progressValue}
            onChange={(e) => setProgressValue(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
