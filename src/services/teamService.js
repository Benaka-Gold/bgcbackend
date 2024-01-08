// src/services/teamService.js
const Team = require('../database/models/Team');
const mongoose = require('mongoose')

const createTeam = async (data) => {
  const team = new Team(data);
  await team.save();
  return team;
};

const getTeams = async () => {
  return await Team.find().populate('members', 'name');
};

const getTeamById = async (id) => {
  return await Team.findById(id).populate('members', 'name');
};

const getTeamsByTeamType = async (id) => {
  try{
    return await Team.find({teamTypeId : id})
  }
  catch (error) { 
    throw error;
  }
}

const updateTeam = async (id, data) => {
  return await Team.findByIdAndUpdate(id, data, { new: true });
};

const deleteTeam = async (id) => {
  return await Team.findByIdAndDelete(id);
};

const addMembers = async (teamId, members) => {
  try {
    // Ensure members is an array
    console.log(members)
    members = Array.isArray(members) ? members : [members];
    members = members.map(member => {
      return {_id : new mongoose.Types.ObjectId(member._id),isTL : member.isTL}
    });
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: { $each: members } } },
      { new: true }
    );
    return updatedTeam;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeMembers = async (teamId, members) => {
  try {
    // Ensure members is an array
    members = Array.isArray(members) ? members : [members];
    members = members.map(member => mongoose.Types.ObjectId(member));
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { $pullAll: { members: members } },
      { new: true }
    );
    return updatedTeam;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMembers,
  removeMembers,
  getTeamsByTeamType
};
