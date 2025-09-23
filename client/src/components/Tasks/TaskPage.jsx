import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import { FilePenLine, Trash2 } from "lucide-react";
import "../../styles/taskPage.css";
import CreateTaskDialog from "./CreateTask";
import { deleteTask, getTasks } from "../../services/api";
import useAuth from "../Auth/useAuth";
import { useSnackbar } from "../../context/GlobalSnackbarProvider";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();
  const userId = user ? user.uid : null;
  const { showSnackbar } = useSnackbar();

  const fetchUserTasks = async () => {
    try {
      const data = await getTasks(userId);
      setTasks(data);
      showSnackbar("Tasks Found", "success");
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Failed to load tasks",
        "error"
      );
      setTasks([]);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserTasks();
    }
  }, [userId]);

  const handleEditTask = (index) => {
    return;
  };

  const handleDeleteTask = async (index) => {
    const taskId = tasks[index]._id;
    try {
      const response = await deleteTask(taskId);
      if (response.status === 200) {
        await fetchUserTasks();
        showSnackbar(
          response?.data?.message || "Task has been deleted successfully",
          "success"
        );
      } else {
        showSnackbar(response?.data?.message || "Delete failed!", "warning");
      }
    } catch (error) {
      console.log("Failed to delete task:", error.message);
      showSnackbar(
        error.response?.data?.message || "Failed to load tasks",
        "error"
      );
    }
  };
  const handleTaskCreated = () => {
    fetchUserTasks();
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box>
        {tasks.length === 0 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={4}
            sx={{ minHeight: "70vh" }}
          >
            <Box
              component="img"
              src="/media/images/woman-sigh.png"
              alt="No tasks"
              sx={{ width: "25%", objectFit: "contain" }}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                No tasks available. Start by adding one!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Add Task
              </Button>
            </Box>
          </Stack>
        ) : (
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Add Task
              </Button>
            </Box>

            <Paper elevation={0}>
              <List>
                {tasks.map((task, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditTask(index)}
                          disabled
                          size="small"
                          sx={{ textTransform: "none" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteTask(index)}
                          size="small"
                          sx={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    }
                  >
                    <Stack
                      direction={{ sm: "column", md: "row" }}
                      spacing={4}
                      alignItems={{ sm: "flex-start", md: "center" }}
                    >
                      <ListItemText
                        sx={{ minWidth: "100px" }}
                        primary={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                            fontWeight="bold"
                          >
                            {task.title || task.name || "Untitled Task"}
                          </Typography>
                        }
                      />
                      <ListItemText
                        sx={{ minWidth: "100px" }}
                        primary={
                          <Typography
                            sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                          >
                            {task.target && task.unit
                              ? `${task.target} ${task.unit}`
                              : "Target not set"}
                          </Typography>
                        }
                      />
                      <ListItemText
                        sx={{ minWidth: "100px" }}
                        primary={
                          <Typography
                            sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                          >
                            {task.rewards.length
                              ? `Rewards: ${task.rewards.length}`
                              : "No Rewards"}
                          </Typography>
                        }
                      />
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                          >
                            {task.progress?.length
                              ? `Progress: ${task.progress.length}`
                              : "No progress yet"}
                          </Typography>
                        }
                      />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </>
        )}

        {/* Dialog to add a new task */}
        <CreateTaskDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onTaskCreated={handleTaskCreated}
        />
      </Box>
    </Container>
  );
};

export default TaskPage;
