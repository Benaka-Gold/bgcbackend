const Branch = require('../database/models/Branch');
const fileUploadService = require('./FileUploadService')
const createBranch = async (branchData) => {
  const branch = new Branch(branchData);
  return await branch.save();
};

const getBranchById = async (id) => {
  return await Branch.findById(id);
};

const getBranches = async()=>{
    return await Branch.find();
}

const updateBranch = async (id, branchData) => {
  return await Branch.findByIdAndUpdate(id, branchData, { new: true });
};

const deleteBranch = async (id) => {
  const branch = await Branch.findById(id)
  await fileUploadService.deleteFile(branch.branchImage)
  return await Branch.findByIdAndDelete(id);
};

module.exports = {
  createBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
  getBranches
};
