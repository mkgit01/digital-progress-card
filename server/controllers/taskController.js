import Task from '../models/Task.js';
// Create Task in DB
export const createTask = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.name || !req.body.target || !req.body.unit) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    const taskData = {
      ...req.body,
      progress: req.body.progress || [], // Default empty array if missing
    };
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error in createTask:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Fetch tasks for a user
export const getTasks = async (req, res) => {
  const userId = req.query.userId || req.body.userId; // Flexible to support query or body input
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch tasks for the given userId
    const tasks = await Task.find({ userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

