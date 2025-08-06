const Task = require('../models/Task');

// Create a new task
async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error('Create Task Error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

// Get all tasks for the logged-in user
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks: tasks.map(task => ({
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }))
    });
  } catch (error) {
    console.error('Get All Tasks Error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// Get a single task by ID
async function getTask(req, res) {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error('Get Task Error:', error);
    res.status(400).json({ error: 'Invalid task ID' });
  }
}

// Update an existing task
async function updateTask(req, res) {
  try {
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task: {
        id: updatedTask._id,
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt
      }
    });
  } catch (error) {
    console.error('Update Task Error:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
}

// Delete a task by ID
async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete Task Error:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
}

// Delete all tasks for the user
async function deleteTasks(req, res) {
  try {
    const result = await Task.deleteMany({ user: req.user.id });

    res.status(200).json({
      message: `${result.deletedCount} tasks deleted`
    });
  } catch (error) {
    console.error('Delete All Tasks Error:', error);
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
