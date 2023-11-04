// src/controllers/teamController.js
const teamService = require('../services/teamService');
const teamTypeService = require('../services/teamTypeService')
exports.createTeam = async (req, res) => {
  try {
    const team = await teamService.createTeam(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await teamService.getTeams();
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await teamService.getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const updatedTeam = await teamService.updateTeam(req.params.id, req.body);
    if (!updatedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await teamService.deleteTeam(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addMembers = async (req, res) => {
  try {
    const updatedTeam = await teamService.addMembers(req.params.id, req.body.members);
    if (!updatedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.removeMembers = async (req, res) => {
  try {
    const updatedTeam = await teamService.removeMembers(req.params.id, req.body.members);
    if (!updatedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' });
    }
    res.status(200).json({ success: true, data: updatedTeam });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTeamsByTeamType = async (req,res) => {
  try {
    const teamTypeId = await teamTypeService.getTeamTypeByName(req.params.teamName)
    const teams = await teamService.getTeamsByTeamType(teamTypeId)
    res.status(200).json({success : true, data : teams})
  }
  catch(error) {
    res.status(400).json({success : false,error : error})
  }
}