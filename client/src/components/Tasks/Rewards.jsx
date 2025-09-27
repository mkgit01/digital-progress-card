import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { Stack, StepConnector, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import axios from "axios";
import useAuth from "../Auth/useAuth";

// Custom connector to show lines
const CustomConnector = styled(StepConnector)(({ theme, ownerState }) => ({
  "& .MuiStepConnector-line": {
    height: 3,
    borderRadius: 1,
    backgroundColor: ownerState.completed ? "#4caf50" : "#bdbdbd", // green if previous step completed
  },
}));

// Custom Step Icon to show completed steps in green
function CustomStepIcon({ completed }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: completed ? "#4caf50" : "#bdbdbd",
      }}
    >
      {completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
    </Box>
  );
}

export default function Rewards() {
  const [taskRewards, setTaskRewards] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRewards = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/rewards/${user.uid}`
        );

        const tasksData = response.data.map((task) => {
          const progressPercent = (task.totalProgress / task.target) * 100;

          // Count completed steps
          let completedSteps = 0;
          const rewardsWithStatus = task.rewards.map((reward) => {
            const unitPercent = parseInt(reward.unit);
            const achieved = progressPercent >= unitPercent;
            if (achieved) completedSteps++;
            return { ...reward, achieved };
          });

          return {
            taskName: task.name,
            rewards: rewardsWithStatus,
            activeStep: completedSteps,
            target: task.target,
            totalProgress: task.totalProgress,
          };
        });

        setTaskRewards(tasksData);
      } catch (err) {
        console.error("Error fetching rewards:", err);
      }
    };

    fetchRewards();
  }, [user]);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {taskRewards.map((task, idx) => (
        <Box
          key={idx}
          sx={{ mb: 4, border: "1px solid #ccc", p: 2, borderRadius: 2 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {task.taskName}
          </Typography>

          {/* Scrollable Stepper */}
          <Box sx={{ overflowX: "auto" }}>
            <Stepper
              alternativeLabel
              activeStep={task.activeStep - 1}
              sx={{
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              {task.rewards.map((reward, index) => (
                <Step key={index} sx={{ minWidth: 120 }}>
                  <StepLabel
                    StepIconComponent={() => (
                      <CustomStepIcon completed={reward.achieved} />
                    )}
                    sx={{
                      "& .MuiStepConnector-line": {
                        backgroundColor: reward.achieved
                          ? "#4caf50"
                          : "#bdbdbd",
                      },
                    }}
                  >
                    <Tooltip title={reward.name} arrow>
                      <span>
                        {reward.name.length > 10
                          ? reward.name.slice(0, 10) + "..."
                          : reward.name}
                      </span>
                    </Tooltip>{" "}
                    ({reward.unit})
                  </StepLabel>

                  {/* Render connector only for steps AFTER the first step */}
                  {index > 0 && (
                    <CustomConnector
                      ownerState={{ completed: reward.achieved }}
                    />
                  )}
                </Step>
              ))}
            </Stepper>
          </Box>

          <Stack
            spacing={1}
            direction={"row"}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Typography sx={{ mt: 2, mb: 1 }}>
              Step {task.activeStep} of {task.rewards.length}
            </Typography>

            <Typography>
              Progress: {task.totalProgress} / {task.target}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
