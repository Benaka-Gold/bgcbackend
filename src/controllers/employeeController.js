const employeeService = require('../services/employeeService');
const { createUser } = require('./userController');

// Controller functions
async function createEmployee(req, res) {
  try {
    const employeeData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        fatherName : req.body.fatherName,
        empCode : req.body.empCode,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        dateOfBirth : req.body.dateOfBirth,
        address : req.body.address,
        position : req.body.position,
        department : req.body.department,
        dateOfBirth : req.body.dateOfBirth,
        dateHired : req.body.dateHired,
        documents : req.body.documents,
        division : req.body.division,
        team : req.body.team
    }
    const newEmployee = await employeeService.createEmployee(employeeData,createUser,req.body.role,req.body.teamId);
    res.status(200).json({success : true,data : newEmployee});
  } catch (error) {
    res.status(500).json({message: error.message });
  }
}

async function getEmployee(req, res) {
  try {
    const employee = await employeeService.getEmployee(req.params.id);
    res.status(200).json({sucess:true,data : employee});
  } catch (error) {
    res.status(404).json({success : false, error: error.message });
  }
}

async function getEmployees(req, res) {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json({sucess:true,data : employees});

  } catch (error) {
    res.status(500).json({success : false,error: error.message });
  }
}

async function updateEmployee(req, res) {
  try {
    const updatedEmployee = await employeeService.updateEmployee(req.params.empId, req.body);
    res.status(200).json({success : true,data : updatedEmployee});
  } catch (error) {
    res.status(500).json({success : false, error: error.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { teamId } = req.body; // Assume teamId is sent in the request body
    const deletedEmployee = await employeeService.deleteEmployee(req.params.id, teamId);
    res.status(200).json({sucess : true,deletedEmployee});
  } catch (error) {
    res.status(400).json({success :false, error: error.message });
  }
}

module.exports = {createEmployee,getEmployee,getEmployees,updateEmployee,deleteEmployee}
