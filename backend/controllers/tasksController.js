import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

// @desc fetch all tasks
// @route GET /api/tasks
// @access Public

const getTasks = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("assignedTo", { name: 1 });
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  } catch (error) {}
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  const { taskName, assignedTo, priority } = req.body;

  const newTask = new Task({
    taskName,
    assignedTo,
    priority,
  });

  if (!newTask) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

  await newTask.save();
  return res.status(201).json({
    message: "New task added to the list",
  });
});

// @desc    Update task
// @route   PATCH /api/tasks/:id
// @access  Private/Admin
/* const updateTask = asyncHandler(async (req, res) => {
  const { assignedTo, priority, completed } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.assignedTo = assignedTo;
    task.priority = priority;
    task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error({ error: "Task not found" });
  }
}); */

// @desc    update finished task
// @route   PATCH /api/tasks/finished/:id
// @access  Private/Admin
const updateTaskFinished = asyncHandler(async (req, res) => {
  const { completed } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.completed = completed;
    task.priority = "done";

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error({ error: "Task not found" });
  }
});
// @desc    update task
// @route   PATCH /api/tasks/admin/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const { assignedTo, priority, taskName } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.priority = priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error({ error: "Task not found" });
  }
});

// @desc    Delete task
// @route   DELETE /api/task/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();
    res.json({ message: "Task removed" });
  } else {
    res.status(404);
    throw new Error("Task not found");
  }
});

export { getTasks, createTask, updateTask, updateTaskFinished, deleteTask };
