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
  return await Task.findById(id).populate('assignedTo','name').populate('customerId','name').populate('purity');
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
  return await Task.find().select('status').populate('customerId','name')
  .populate('assignedTo','name')
  .populate({path : "businessId",select : 'branchId netWeight grossWeight goldType',populate : {path : 'branchId',select : 'branchName'}});
};

const getTasksByStatus = async (data) => {
  return await Task.find({status : data.status,division : data.division})
  .populate('customerId','name')
  .populate('assignedTo','name')
  .populate('businessId')
}

const getTaskByExecutive = async (id) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for today

  return await Task.find({
    assignedTo: id,
    $or: [
      { 
        status: { $nin: ['Finished', 'purchase_acc_approved', 'purchase_payment_done', 'cancel_approved'] } 
      },
      {
        status: { $in: ['Finished', 'purchase_acc_approved', 'purchase_payment_done', 'cancel_approved'] },
        updatedAt: { $gte: today }
      }
    ]
  }).populate('customerId');
}

const getTaskByDivision = async (division) => {
  return await Task.find({division : division}).populate('customerId businessId branchId').populate('assignedTo','name')
}


const complianceVerificationTaskData = async(id) => {
  try{
    return await Task.findById(id)
    .populate({path : 'leadId',populate : {path : 'assignedTo verifiedBy assignedTeam',select : 'name role'}})
    .populate({path : 'businessId',select : '-leadId -taskId -customerId',populate : {path : 'branchId',select : 'branchName'}})
    .populate('customerId')
    .populate('assignedTo','name');
  } catch(error){
    throw error;
  }
}

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskByExecutive,
  getTasksByStatus,
  getTaskByDivision,
  complianceVerificationTaskData,
};
