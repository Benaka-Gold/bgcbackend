// src/services/userService.js
const User = require("../database/models/User");

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getUserByEmpId = async (empId) => {
  const user = await User.findOne({ empId: empId.toUpperCase() });
  return user;
};

const getUserByPhone = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber: String(phoneNumber) });
  return user;
};

const getUsersByTeam = async (teamId) => {
  const users = await User.find({ teamId: teamId });
  return users;
};
const updateUserByEmpId = async (empId, updatedData) => {
  const user = await User.findOneAndUpdate(
    { empId: empId.toUpperCase() },
    updatedData,
    { new: true, runValidators: true }
  );
  return user;
};

const getUserByRole = async (role) => {
  try {
    const users = await User.find({ role: role });
    return users;
  } catch (error) {
    throw error;
  }
};

const deleteUserByEmpId = async (empId) => {
  const user = await User.findOneAndDelete({ empId: empId.toUpperCase() });
  return user;
};

module.exports = {
  createUser,
  getUserByEmpId,
  updateUserByEmpId,
  deleteUserByEmpId,
  getUserByPhone,
  getUsersByTeam,
  getUserByRole
};
