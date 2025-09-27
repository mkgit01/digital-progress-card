import axios from "axios";

// Create task api hit
export const createTask = async (taskData) => {
  try {
    console.log("client-taskData:", taskData);
    const response = await axios.post(
      // "http://localhost:5000/api/tasks",
      "https://digital-progress-card.onrender.com/api/tasks",
      taskData
    );
    if (response && response.data) {
      console.log("Task created successfully:", response);
      console.log("response:", response, "response data:", response.data);
      return response.data;
    } else {
      console.log("response:", response, "response data:", response.data);
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
};

// Get task api hit
export const getTasks = async (userId) => {
  try {
    const response = await axios.get(
      // "http://localhost:5000/api/tasks",
      "https://digital-progress-card.onrender.com/api/tasks",

       {
      params: { userId },
    });
    console.log("Tasks fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(
      // `http://localhost:5000/api/tasks/${taskId}`
      `https://digital-progress-card.onrender.com/api/tasks/${taskId}`,

    );
    return response;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
