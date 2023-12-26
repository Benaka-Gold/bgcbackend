const ornamentService = require('../services/ornamentService');

const createOrnament = async (req, res) => {
  try {
    const ornament = await ornamentService.createOrnament(req.body);
    res.status(200).json(ornament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrnamentsByCustomerId = async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const businessId = req.body.businessId;
    const ornaments = await ornamentService.getOrnamentsByCustomerId(customerId,businessId);
    res.status(200).json(ornaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrnamentById = async (req, res) => {
  try {
    const id = req.params.id;
    const ornament = await ornamentService.getOrnamentById(id);
    if (!ornament) {
      return res.status(404).json({ message: 'Ornament not found' });
    }
    res.status(200).json(ornament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrnament = async (req, res) => {
  try {
    const id = req.params.id;
    const ornament = await ornamentService.updateOrnament(id, req.body);
    res.status(200).json(ornament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrnament = async (req, res) => {
  try {
    const id = req.params.id;
    await ornamentService.deleteOrnament(id);
    res.status(200).json({ message: 'Ornament deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrnament,
  getOrnamentsByCustomerId,
  getOrnamentById,
  updateOrnament,
  deleteOrnament
};