// src/services/taskService.js
const Task = require('../database/models/Task');

// Create a new task
const createTask = async (taskData) => {
  const task = new Task(taskData);
  await task.save();
  return task;
};

// Retrieve a task by ID
const getTaskById = async (id) => {
  return await Task.findById(id).populate('assignedTo','name').populate('customerId','name');
};

// Update a task
const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

// Delete a task
const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

// Retrieve all tasks
const getAllTasks = async () => {
  return await Task.find();
};

const getTasksByStatus = async (status) => {
  return await Task.find({status : status}).populate('customerId','name').populate('assignedTo','name');
}

const getTaskByExecutive = async (id) => {
  return await Task.find({assignedTo : id}).populate('customerId')
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskByExecutive,
  getTasksByStatus
};
