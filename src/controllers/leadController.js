// src/controllers/leadController.js
const leadService = require('../services/leadService');

exports.createLead = async (req, res) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getFreshLeads = async (req,res) => {
  try{ 
    const leads = await leadService.getFreshLeads(req.params.teamId)
    res.status(200).json({success : true,data : leads})
  }
  catch(error){
    res.status(400).json({success : false,error : error.message})
  }
}

exports.getLeads = async (req, res) => {
  try {
    const leads = await leadService.getLeads();
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getLeadsByTeam = async (req,res) => {
  try {
    const leads = await leadService.getLeadsByTeam(req.body.teamId);
    res.status(200).json({success : true,data : leads});
  }
  catch (error) {
    res.status(500).json({success: false,error : error.message});
  }
}

exports.getLeadById = async (req, res) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await leadService.updateLead(req.params.id, req.body);
    if (!updatedLead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const deletedLead = await leadService.deleteLead(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getLeadByUser = async (req,res) => {
  try {
    const leads = await leadService.getLeadByUser(req.body.userId);
    res.status(200).json({success : true,data : leads})
  }
  catch (error) {
    res.status(500).json({success : false})
  }
}

exports.getMoveLeads = async (req,res) => {
  try {
    const leads = await leadService.getMoveLeads();
    res.status(200).json({success: true,data : leads})
  }
  catch (error){
    res.status(500).json({success: false,error : error})
  }
}