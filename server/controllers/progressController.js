import Task from "../models/Task.js";
import dayjs from "dayjs";

export const addProgress = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { value } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const today = dayjs().format("YYYY-MM-DD");

    // Check if today already has progress
    const progressToday = task.progress.find(
      (p) => dayjs(p.date).format("YYYY-MM-DD") === today
    );
    if (progressToday) {
      return res.status(400).json({ msg: "Progress already submitted today" });
    }

    // Calculate total progress so far
    const totalProgress = task.progress.reduce((sum, p) => sum + p.amount, 0);

    // Prevent exceeding target
    const remaining = Math.max(task.target - totalProgress, 0);
    if (remaining <= 0) {
      return res.status(400).json({ msg: "Target already achieved" });
    }

    const actualValue = Math.min(value, remaining);

    task.progress.push({
      date: new Date(),
      amount: actualValue,
    });

    await task.save();

    res.json({ msg: "Progress added", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskProgress = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const weeklyProgress = {};
    const monthlyProgress = {};
    const yearlyProgress = {};

    task.progress.forEach((p) => {
      const date = dayjs(p.date);

      // Week: Sunday as start of week
      const weekStart = date.startOf("week").format("YYYY-MM-DD");
      weeklyProgress[weekStart] = (weeklyProgress[weekStart] || 0) + p.amount;

      // Month: 1st day of month
      const monthStart = date.startOf("month").format("YYYY-MM-01");
      monthlyProgress[monthStart] = (monthlyProgress[monthStart] || 0) + p.amount;

      // Year: Jan 1st
      const yearStart = date.startOf("year").format("YYYY-01-01");
      yearlyProgress[yearStart] = (yearlyProgress[yearStart] || 0) + p.amount;
    });

    // Convert objects to arrays
    const formatProgress = (obj) =>
      Object.entries(obj).map(([day, progress]) => ({
        day,
        progress: Math.min(progress, task.target),
      }));

    const totalProgress = task.progress.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      _id: task._id,
      name: task.name,
      createdDate: task.createdAt,
      updatedDate: task.updatedAt,
      weeklyProgress: formatProgress(weeklyProgress),
      monthlyProgress: formatProgress(monthlyProgress),
      yearlyProgress: formatProgress(yearlyProgress),
      target: task.target,
      rewards: task.rewards,
      progress: task.progress,
      totalProgress,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateProgress = async (req, res) => {
  try {
    const { taskId, progressId } = req.params;
    const { value } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const progress = task.progress.id(progressId);
    if (!progress) return res.status(404).json({ msg: "Progress not found" });

    progress.value = value;
    await task.save();

    res.json({ msg: "Progress updated", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    const { taskId, progressId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.progress.id(progressId).remove();
    await task.save();

    res.json({ msg: "Progress deleted", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
