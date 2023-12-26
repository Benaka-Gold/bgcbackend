// src/controllers/taskController.js
const taskService = require('../services/taskService');
const customerService = require('../services/customerService');
const leadService = require('../services/leadService') 
const mongoose = require('mongoose');
const Customer = require('../database/models/Customer');
const businessService = require('../services/businessService');
// Handle creating a new task

// const create = async (req, res) => {
//   try {
//     let lead = req.body.lead;
//     // console.log(req.body)
//     //Update Lead
//     await leadService.updateLead(lead._id,{...lead, status : "Assigned"})
//     let customer = await Customer.findOne({phoneNumber : lead.phoneNumber})
//     var data = {
//       assignedTo : req.body.executive,
//       appointmentTime : req.body.appointmentTime,
//       leadId : lead._id,
//       status : 'pending',
//       weight : lead.weight,
//       purity : lead.purity,
//       description : req.body.goldType,
//       division : lead.division
//     }
//     if(customer._id !== undefined){
//       data.customerId = customer._id;
//       await customerService.updateCustomer(customer._id,{leadId : lead._id})
//     } else {  
//         customer = await customerService.createCustomer({
//         name : lead.name,
//         phoneNumber : lead.phoneNumber,
//         leadId : lead._id,
//         source : lead.source
//       })
//       data.customerId = customer._id    
//     }  
 
//     const task = await taskService.createTask(data);
//     await leadService.updateLead(lead._id,{taskId : task._id})
//     const business = await businessService.createBusiness({leadId : task.leadId,taskId : task._id,customerId : task.customerId, status : 'Started'});

//     res.status(200).json({success : true});
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ error: error.message });
//   }
// };

const create = async (req, res) => {
  try {
    const lead = req.body.lead;
    await updateLeadStatus(lead._id, "Assigned");

    const customer = await getOrCreateCustomer(lead);
    const taskData = createTaskData(req.body, lead, customer._id);
    const task = await taskService.createTask(taskData);

    await updateLeadWithTask(lead._id, task._id);
    const business = await createBusiness(task);

    await updateCustomerWithBusinessId(customer._id, business._id);
    await taskService.updateTask(task._id,{businessId : business._id})
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

async function updateLeadStatus(leadId, status) {
  await leadService.updateLead(leadId, { status });
}

async function getOrCreateCustomer(lead) {
  let customer = await Customer.findOne({ phoneNumber: lead.phoneNumber });
  if (!customer) {
    customer = await customerService.createCustomer({
      name: lead.name,
      phoneNumber: lead.phoneNumber,
      leadId: lead._id,
      source: lead.source
    });
  } else {
    await customerService.updateCustomer(customer._id, { leadId: lead._id });
  }
  return customer;
}

function createTaskData(requestBody, lead, customerId) {
  return {
    assignedTo: requestBody.executive,
    appointmentTime: requestBody.appointmentTime,
    leadId: lead._id,
    status: 'pending',
    weight: lead.weight,
    purity: lead.purity,
    description: requestBody.goldType,
    division: lead.division,
    customerId
  };
}

async function updateLeadWithTask(leadId, taskId) {
  await leadService.updateLead(leadId, { taskId });
}

async function createBusiness(task) {
  try {
    const business = await businessService.createBusiness({
    leadId: task.leadId,
    taskId: task._id,
    customerId: task.customerId,
    status: 'Created',
    division : task.division
  });
  return business;
  } catch(error) {
    throw error;
  }
}

async function updateCustomerWithBusinessId(customerId, businessId) {
  await customerService.updateCustomer(customerId, {
    $push: { businessId: businessId }
  });
}


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
    req.body.division = req.user.division
    const tasks = await taskService.getTasksByStatus(req.body);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({error : error.message})
  }
}

const getTaskByDivision = async(req,res) => {
  try{
    const tasks = await taskService.getTaskByDivision(req.user.division);
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({error : error.message})
  }
}

const complianceVerificationTasks= async(req,res) => {
  try{
    const tasks = await taskService.complianceVerificationTasks(req.user.division)
    res.status(200).json(tasks)
  } catch(error) {
    res.status(500).json({error : error.message})
  }
}

const complianceVerificationTaskData = async(req,res) => {
  try{
    const taskData = await taskService.complianceVerificationTaskData(req.params.id)
    res.status(200).json(taskData)
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
  getTasksByStatus,
  getTaskByDivision,
  complianceVerificationTasks,
  complianceVerificationTaskData,
};