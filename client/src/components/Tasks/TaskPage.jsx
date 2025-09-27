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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
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
      try {
        fetchUserTasks();
        showSnackbar("Tasks Found", "success");
      } catch (error) {
        console.log(error);
      }
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
            <Stack
              direction={"row"}
              justifyContent="space-between"
              mb={2}
              alignItems={"center"}
            >
              <Typography variant="h6">Tasks</Typography>
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Add Task
              </Button>
            </Stack>

            <Paper elevation={0} sx={{ overflowX: "auto" }}>
              <Table sx={{ borderCollapse: "separate" }}>
                <TableBody>
                  {tasks.map((task, index) => (
                    <TableRow key={index} sx={{ borderBottom: "none" }}>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Typography
                          sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                        >
                          {task.title || task.name || "Untitled Task"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Typography
                          sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                        >
                          {task.target && task.unit
                            ? `${task.target} ${task.unit}`
                            : "Target not set"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: "none" }}>
                        <Typography
                          sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}
                        >
                          {task.rewards.length
                            ? `Rewards: ${task.rewards.length}`
                            : "No Rewards"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          maxWidth: { xs: "", md: 100 },
                          borderBottom: "none",
                        }}
                      >
                        <Tooltip title="Not Available Right Now">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleEditTask(index)}
                            // disabled
                            size="small"
                            sx={{
                              textTransform: "none",
                              mr: 1,
                              color: "grey.400",
                              borderColor: "grey.400",
                              cursor: "default",
                            }}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteTask(index)}
                          size="small"
                          sx={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
