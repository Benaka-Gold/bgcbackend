const FundService = require('../services/fundService');

exports.createFund = async (req, res) => {
    try {
        const fund = await FundService.createFund(req.body);
        res.status(201).json(fund);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFundById = async (req, res) => {
    try {
        const fund = await FundService.getFundById(req.params.id);
        if (!fund) return res.status(404).json({ message: 'Fund not found' });
        res.json(fund);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllFunds = async(req,res) => {
    try {
        const funds = await FundService.getAllFunds();
        res.status(200).json(funds)
    } catch(error) {
        res.status(500).json({error : error.message})
    }
}

exports.updateFund = async (req, res) => {
    try {
        const updatedFund = await FundService.updateFund(req.params.id, req.body);
        res.json(updatedFund);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFund = async (req, res) => {
    try {
        await FundService.deleteFund(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
