const goldRateService = require('../services/goldRateService');

exports.createGoldRate = async (req, res) => {
    try {
        const goldRate = await goldRateService.createGoldRate(req.body);
        res.status(201).json(goldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGoldRates = async (req, res) => {
    try {
        const goldRates = await goldRateService.getGoldRates();
        res.status(200).json(goldRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGoldRateById = async (req, res) => {
    try {
        const goldRate = await goldRateService.getGoldRateById(req.params.id);
        if (!goldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }
        res.status(200).json(goldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGoldRate = async (req, res) => {
    try {
        const updatedGoldRate = await goldRateService.updateGoldRate(req.params.id, req.body);
        if (!updatedGoldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }
        res.status(200).json(updatedGoldRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGoldRate = async (req, res) => {
    try {
        const goldRate = await goldRateService.deleteGoldRate(req.params.id);
        if (!goldRate) {
            return res.status(404).json({ message: 'Gold rate not found' });
        }
        res.status(200).json({ message: 'Gold rate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update24kRate = async(req,res) => {
    try{
        const goldRates = await goldRateService.update24kRate(req.body.price);
        res.status(200).json("Updated Successfully")
    }
    catch(error) {
        res.status(500).json({message : error.message})
    }
}