const businessService = require('../services/businessService');

exports.createBusiness = async (req, res) => {
    try {
        const business = await businessService.createBusiness(req.body);
        res.status(201).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBusinesses = async (req, res) => {
    try {
        const businesses = await businessService.getAllBusinesses();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBusinessById = async (req, res) => {
    try {
        const business = await businessService.getBusinessById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBusiness = async (req, res) => {
    try {
        const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
        if (!updatedBusiness) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.status(200).json(updatedBusiness);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBusiness = async (req, res) => {
    try {
        await businessService.deleteBusiness(req.params.id);
        res.status(200).json({ message: 'Business deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBusinessByPeriod = async(req,res) => {
    try {
        const business = await businessService.getBusinessByPeriod(req.body.from,req.body.to)
        res.status(200).json(business)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.generateBill = async(req,res) => {
    try {
        const data = await businessService.generateBill(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}