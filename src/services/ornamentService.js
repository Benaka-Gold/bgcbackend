const Ornament = require('../database/models/Ornament');

const createOrnament = async (data) => {
  const ornament = new Ornament(data);
  await ornament.save();
  return ornament;
};

const getOrnamentsByCustomerId = async (customerId) => {
  return await Ornament.find({ customerId: customerId });
};

const getOrnamentById = async (id) => {
  return await Ornament.findById(id);
};

const updateOrnament = async (id, data) => {
  return await Ornament.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrnament = async (id) => {
  return await Ornament.findByIdAndDelete(id);
};

module.exports = {
  createOrnament,
  getOrnamentsByCustomerId,
  getOrnamentById,
  updateOrnament,
  deleteOrnament
};
