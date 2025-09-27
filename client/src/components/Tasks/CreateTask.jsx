import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createTask } from "../../services/api";
import useAuth from "../Auth/useAuth";
import { useSnackbar } from "../../context/GlobalSnackbarProvider";

function CreateTaskDialog({ open, onClose, onTaskCreated }) {
  const { user } = useAuth();
  const [taskName, setTaskName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleClose = () => {
    setTaskName("");
    setTarget("");
    setUnit("");
    setRewards([]);
    setError("");
    onClose();
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      userId: user.uid,
      name: taskName,
      target,
      unit,
      rewards,
    };

    try {
      await createTask(taskData);
      onTaskCreated();
      handleClose();
      showSnackbar("Task Created Successfully", "success");
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    }
  };

  const addReward = () => {
    if (rewards.length >= 10) return;

    const lastPercent = rewards.length
      ? parseInt(rewards[rewards.length - 1].unit.replace("%", ""), 10)
      : 0;

    if (lastPercent >= 100) return;

    setRewards([
      ...rewards,
      { unit: "", name: "", minPercent: lastPercent + 1 },
    ]);
  };

  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...rewards];

    // Validate percent for increasing order
    if (field === "unit") {
      const percentValue = parseInt(value.replace("%", ""), 10);
      const lastPercent =
        index === 0
          ? 0
          : parseInt(updatedRewards[index - 1].unit.replace("%", ""), 10);
      if (percentValue <= lastPercent) return; // Ignore invalid input
    }

    updatedRewards[index][field] = value;
    setRewards(updatedRewards);
  };

  // Available percentages filtered based on previous reward
  const getAvailablePercents = (index) => {
    const lastPercent =
      index === 0 ? 0 : parseInt(rewards[index - 1].unit.replace("%", ""), 10);
    return [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ].filter((p) => parseInt(p.replace("%", ""), 10) > lastPercent);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleTaskSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Task Name"
                variant="outlined"
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Target"
                type="number"
                fullWidth
                variant="outlined"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="unit-label"
                  sx={{ backgroundColor: "white", px: 1 }}
                  required
                >
                  Unit
                </InputLabel>
                <Select
                  labelId="unit-label"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <MenuItem value="" sx={{ color: "#585858ff" }}>
                    Select Unit
                  </MenuItem>
                  <MenuItem value="kg">Kilogram (kg)</MenuItem>
                  <MenuItem value="g">Gram (g)</MenuItem>
                  <MenuItem value="lb">Pound (lb)</MenuItem>
                  <MenuItem value="hr">Hour (hr)</MenuItem>
                  <MenuItem value="time">Time</MenuItem>
                  <MenuItem value="min">Minutes (min)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box textAlign="right" mt={2}>
            <Button
              variant="outlined"
              onClick={addReward}
              disabled={
                rewards.length >= 10 ||
                (rewards.length > 0 &&
                  parseInt(
                    rewards[rewards.length - 1].unit.replace("%", ""),
                    10
                  ) >= 100)
              }
            >
              Add Reward
            </Button>
          </Box>

          <Box mt={2}>
            {rewards.map((reward, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ backgroundColor: "white", px: 1 }}>
                      Percentage
                    </InputLabel>
                    <Select
                      value={reward.unit}
                      onChange={(e) =>
                        handleRewardChange(index, "unit", e.target.value)
                      }
                      required
                    >
                      <MenuItem value="">Select</MenuItem>
                      {getAvailablePercents(index).map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Reward Name"
                    fullWidth
                    value={reward.name}
                    onChange={(e) =>
                      handleRewardChange(index, "name", e.target.value)
                    }
                    required
                  />
                </Grid>
              </Grid>
            ))}
          </Box>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box display="flex" width="100%" gap={2}>
          <Button onClick={handleClose} variant="outlined" fullWidth>
            Cancel
          </Button>
          <Button onClick={handleTaskSubmit} variant="contained" fullWidth>
            Create Task
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
