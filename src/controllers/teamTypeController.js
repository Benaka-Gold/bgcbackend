const teamTypeService = require('../services/teamTypeService');

exports.createTeamType = async (req, res, next) => {
  try {
    const data = req.body;
    const newTeamType = await teamTypeService.createTeamType(data);
    res.status(200).json(newTeamType);
  } catch (error) {
    next(error);
  }
};

exports.getTeamTypes = async (req, res, next) => {
  try {
    const teamTypes = await teamTypeService.getTeamTypes();
    res.status(200).json(teamTypes);
  } catch (error) {
    next(error);
  }
};

exports.getTeamTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamType = await teamTypeService.getTeamTypeById(id);
    if (!teamType) {
      return res.status(404).send('TeamType not found');
    }
    res.status(200).json(teamType);
  } catch (error) {
    next(error);
  }
};

exports.updateTeamType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedTeamType = await teamTypeService.updateTeamType(id, data);
    if (!updatedTeamType) {
      return res.status(404).send('TeamType not found');
    }
    res.status(200).json(updatedTeamType);
  } catch (error) {
    next(error);
  }
};

exports.deleteTeamType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTeamType = await teamTypeService.deleteTeamType(id);
    if (!deletedTeamType) {
      return res.status(404).send('TeamType not found');
    }
    res.status(200).json(deletedTeamType);
  } catch (error) {
    next(error);
  }
};
