// src/services/leadService.js
const { Schema } = require('mongoose');
const Lead = require('../database/models/Lead');

const createLead = async (data) => {
  const lead = new Lead(data);
  await lead.save();
  return lead;
};

const getLeads = async () => {
  try {
    const leads = await Lead.find()
      .populate('assignedTo', 'name')  // Assuming 'name' is the field you want to fetch from the User collection
      .populate('assignedTeam','name')
      .sort({ createdAt: 1 });
    return leads;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getLeadsByTeam = async ({ query }) => {
  try {
    // Assuming `query.teamId` specifies the team you are interested in
    const leads = await Lead.find({ assignedTeam: query.teamId }).sort({createdAt : 1});
    return leads;
  } catch (error) {
    throw error;  // Optionally re-throw the error if you want to handle it at a higher level
  }
};

const getFreshLeads = async(teamId) => {
  try { 
    console.log(teamId)
    const leads = await Lead.find({
      assignedTo: { $in: [null, undefined] },
      assignedTeam: teamId,
      moveLead: {$in : [null,undefined]}
    }).sort({ createdAt: -1 });
    return leads;
  }
  catch (error){
    throw error;
  }
}


const getLeadByUser = async(userId) => {
  try { 
    const leads = await Lead.find({assignedTo : userId}).sort({createdAt : 1});
    return leads;
  }
  catch (error){
    throw error;
  }
}

const getLeadById = async (id) => {
  return await Lead.findById(id);
};

const getMoveLeads = async() => {
  try { 
    return await Lead.find({moveLead : true}).populate('moveTo')
  }
  catch (error){
    throw error;
  }
}

const updateLead = async (id, data) => {
  return await Lead.findByIdAndUpdate(id, data, { new: true });
};

const deleteLead = async (id) => {
  return await Lead.findByIdAndDelete(id);
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  getLeadsByTeam,
  deleteLead,
  getLeadByUser,
  getFreshLeads,
  getMoveLeads
};
