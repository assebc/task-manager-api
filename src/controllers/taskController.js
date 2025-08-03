const Task = require('../models/Task');

async function createTask(req, res) {
  try {
    const { title } = req.body;
    const task = await Task.create({
      title,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task' });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

async function getTask(req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task ID' });
  }
}

async function updateTask(req, res) {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task' });
  }
}

async function deleteTask(req, res) {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task' });
  }
}

async function deleteTasks(req, res) {
  try {
    await Task.deleteMany({ user: req.user.id });
    res.status(200).json({ message: 'All tasks deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete all tasks' });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  deleteTasks
};
