const branchService = require("../services/branchService");

const createBranch = async (req, res) => {
  try {
    const branch = await branchService.createBranch(req.body);
    res.status(200).json(branch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBranchById = async (req, res) => {
  try {
    const branch = await branchService.getBranchById(req.params.id);
    if (branch) {
      res.json(branch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBranches = async(req,res)=>{
    try {
        const branches = await branchService.getBranches();
        if(branches){
            res.status(200).json({data : branches})
        }
        else {
            res.status(404).json({data : "No Branches Found"})
        }
    }
    catch (error){
        res.status(500).json({error : error})
    }
}

const updateBranch = async (req, res) => {
  try {
    const updatedBranch = await branchService.updateBranch(
      req.params.id,
      req.body
    );
    res.json(updatedBranch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBranch = async (req, res) => {
  try {
    await branchService.deleteBranch(req.params.id);
    res.status(200).json({success : true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBranch,
  updateBranch,
  getBranchById,
  deleteBranch,
  getBranches
};
