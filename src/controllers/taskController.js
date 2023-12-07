// src/controllers/taskController.js
const taskService = require('../services/taskService');
const customerService = require('../services/customerService');
const leadService = require('../services/leadService') 
const mongoose = require('mongoose')
// Handle creating a new task

const create = async (req, res) => {
  try {
    let lead = req.body.lead;
    // console.log(req.body)
    //Update Lead
    await leadService.updateLead(lead._id,{...lead, status : "Assigned"})
    const customer = await customerService.createCustomer({
      name : lead.name,
      phoneNumber : lead.phoneNumber,
      leadId : lead._id,
      source : lead.source
    })
    const data = {
      assignedTo : req.body.executive,
      appointmentTime : req.body.appointmentTime,
      customerId : customer._id,
      leadId : lead._id,
      status : 'pending',
      weight : lead.weight,
      purity : lead.purity,
      description : req.body.goldType
    }
    const task = await taskService.createTask(data);
    await leadService.updateLead(lead._id,{taskId : task._id})
    res.status(200).json({success : true});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle getting a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({success : true,data : task});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTaskByExecutive = async(req,res) => {
  try {
    const task = await taskService.getTaskByExecutive(req.user._id);
    if (!task) return res.status(404).json({ message: 'No Tasks' });
    res.status(200).json({success : true,data : task});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Handle updating a task
const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({success : true,data : task});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle deleting a task
const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ message: 'Task successfully deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle getting all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({success : true,data : tasks});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasksByStatus = async(req,res) => {
  try {
    const tasks = await taskService.getTasksByStatus(req.body.status);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error : error.message})
  }
}

module.exports = {
  create,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskByExecutive,
  getTasksByStatus
};
