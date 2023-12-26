const Ornament = require('../database/models/Ornaments');
const fileService = require('./FileUploadService')

const createOrnament = async (data) => {
  const ornament = new Ornament(data);
  await ornament.save();
  return ornament;
};

const getOrnamentsByCustomerId = async (customerId,businessId) => {
  return await Ornament.find({ customerId: customerId,businessId : businessId }).populate('purity');
};

const getOrnamentById = async (id) => {
  return await Ornament.findById(id);
};

const updateOrnament = async (id, data) => {
  return await Ornament.findByIdAndUpdate(id, data, { new: true });
};

const deleteOrnament = async (id) => {
  const ornament = await Ornament.findById(id);
  if(ornament.image){
    try {
      await fileService.deleteFile(ornament.image)
    } catch(error) {
      console.error(error)
    }
  }
  if(ornament.billAvailable){
    await fileService.deleteFile(ornament.BillImage)
  }
  return await Ornament.findByIdAndDelete(id);
};

module.exports = {
  createOrnament,
  getOrnamentsByCustomerId,
  getOrnamentById,
  updateOrnament,
  deleteOrnament
};
