// src/services/employeeService.js

const Employee = require('../database/models/Employee');
const User = require('../database/models/User');
const { addMembers,removeMembers } = require('./teamService');
const mongoose = require('mongoose');

exports.createEmployee = async (employeeData, createUser, userRole, teamId) => {
  let userId = null;

  // Transaction start
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create a user account for this employee if requested
    if (createUser) {
      const user = new User({
        empId: employeeData.empCode,
        phoneNumber: employeeData.phoneNumber,
        role: userRole  // use the role sent from frontend
      });
      await user.save({ session });
      userId = user._id;
    }

    // Create the employee document
    const employee = new Employee({
      ...employeeData,
      userId: userId
    });
    await employee.save({ session });

    // Update the team members if a team ID is provided
    if (teamId) {
      await addMembers(teamId, employee._id);
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return employee;

  } catch (error) {
    // If an error occurs, abort the transaction and undo any changes
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.getEmployee = async (empId) => {
    try {
      const employee = await Employee.findOne({ empCode: empId }).populate('userId').populate('documents.docFile');
      return employee;
    } catch (error) {
      throw error;
    }
  };

  exports.getEmployees = async()=>{
    try{
        const employees = await Employee.find()
        return employees
    }
    catch(error){
        throw error;
    }
  }

exports.updateEmployee = async (empId, updatedData) => {
    try {
      const updatedEmployee = await Employee.findOneAndUpdate(
        { empCode: empId },
        { $set: updatedData },
        { new: true }
      );
      return updatedEmployee;
    } catch (error) {
      throw error;
    }
  };

  exports.deleteEmployee = async (employeeId, teamId) => {
    // Transaction start
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Find the employee
      const employee = await Employee.findById(employeeId, null, { session });
      if (!employee) {
        throw new Error('Employee not found');
      }
  
      // Update employee status to 'fired'
      employee.status = 'fired';
      await employee.save({ session });
  
      // Delete the associated user account
      if (employee.userId) {
        await User.findByIdAndDelete(employee.userId);
      }
  
      // Remove employee from the team
      if (teamId) {
        const updatedTeam = await removeMembers(teamId, employee._id);
        const isRemoved = !updatedTeam.members.includes(employee._id);
      
        if (!isRemoved) {
          // Handle case where employee was not removed from the team
          throw new Error('Failed to remove employee from the team');
        }
      }
  
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
  
      return employee;  // return updated employee document
  
    } catch (error) {
      // If an error occurs, abort the transaction and undo any changes
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  