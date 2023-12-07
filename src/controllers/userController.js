// src/controllers/userController.js
const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getUserByEmpId = async (req, res) => {
  try {
    const user = await userService.getUserByEmpId(req.params.empId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateUserByEmpId = async (req, res) => {
    try {
      const updatedUser = await userService.updateUserByEmpId(req.params.empId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

exports.getUsersByTeam = async(req,res) => {
  try {
    const users = await userService.getUsersByTeam(req.params.teamId);
    res.status(200).json({success : true, data : users})
  }
  catch(error) {
    res.status(400).json({success : false,error : error.message})
  }
}
  
  exports.deleteUserByEmpId = async (req, res) => {
    try {
      const deletedUser = await userService.deleteUserByEmpId(req.params.empId);
      if (!deletedUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

exports.getUserByRole = async (req,res) => {
  try {
    const users = await userService.getUserByRole(req.params.role)
    if(users.length === 0){
      return res.status(404).json({success : false,error : "No Users found in that role"})
    }
    res.status(200).json({success : true,data : users})
  } catch (error) {
    res.status(500).json({success : false,error : error})
  }
}