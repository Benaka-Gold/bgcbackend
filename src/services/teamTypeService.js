// src/services/teamTypeService.js
const TeamType = require('../database/models/TeamType');

const createTeamType = async (data) => {
  const teamType = new TeamType(data);
  await teamType.save();
  return teamType;
};

const getTeamTypes = async () => {
  return await TeamType.find();
};

const getTeamTypeByName = async(typeName) => {
  return await TeamType.findOne({name : typeName})
}

const getTeamTypeById = async (id) => {
  console.log(id)
  return await TeamType.findById(id);
};

const updateTeamType = async (id, data) => {
  return await TeamType.findByIdAndUpdate(id, data, { new: true });
};

const deleteTeamType = async (id) => {
  return await TeamType.findByIdAndDelete(id);
};

module.exports = {
  createTeamType,
  getTeamTypes,
  getTeamTypeById,
  updateTeamType,
  deleteTeamType,
  getTeamTypeByName
};
