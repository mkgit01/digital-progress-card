import Task from "../models/Task.js";

export const getUserRewards = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get all tasks for this user
    const tasks = await Task.find({ userId });
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ msg: "No tasks found for this user" });
    }

    // Format response
    const response = tasks.map((task) => {
      const totalProgress = task.progress.reduce(
        (sum, p) => sum + (p.amount || 0),
        0
      );

      return {
        userId: task.userId,
        taskId: task._id,
        name: task.name,
        rewards: task.rewards,
        totalProgress,
        target: task.target,
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
