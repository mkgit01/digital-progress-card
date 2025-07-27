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
} from "@mui/material";
import { FilePenLine, Trash2 } from "lucide-react";
import "../../styles/taskPage.css";
import CreateTaskDialog from "./CreateTask";
import { deleteTask, getTasks } from "../../services/api";
import useAuth from "../Auth/useAuth";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();
  const userId = user ? user.uid : null;

  const fetchUserTasks = async () => {
    try {
      const data = await getTasks(userId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserTasks();
    }
  }, [userId]);

  const handleEditTask = (index) => {
    console.log("Edit task", index);
  };

  const handleDeleteTask = async (index) => {
    const taskId = tasks[index]._id;
    try {
      const response = await deleteTask(taskId);
      if (response.status === 200) {
        await fetchUserTasks();
      } else {
        console.log("Delete failed:", response.data?.message);
      }
    } catch (error) {
      console.log("Failed to delete task:", error.message);
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

            <Paper elevation={3}>
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
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteTask(index)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    }
                  >
                    <Stack direction="row" spacing={4} alignItems="center">
                      <ListItemText
                        sx={{ minWidth: "100px" }}
                        primary={
                          <strong>
                            {task.title || task.name || "Untitled Task"}
                          </strong>
                        }
                      />
                      <ListItemText
                        sx={{ minWidth: "100px" }}
                        primary={
                          task.target && task.unit
                            ? `${task.target} ${task.unit}`
                            : "Target not set"
                        }
                      />
                      <ListItemText
                        primary={
                          task.progress?.length
                            ? `Progress: ${task.progress.length}`
                            : "No progress yet"
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
