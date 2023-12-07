const DivisionService = require('../services/divisionService');

exports.createDivision = async (req, res) => {
    try {
        const division = await DivisionService.createDivision(req.body);
        res.status(201).json(division);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDivisions = async (req, res) => {
    try {
        const divisions = await DivisionService.getAllDivisions();
        res.status(200).json(divisions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDivisionById = async (req, res) => {
    try {
        const division = await DivisionService.getDivisionById(req.params.id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }
        res.status(200).json(division);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDivision = async (req, res) => {
    try {
        const updatedDivision = await DivisionService.updateDivision(req.params.id, req.body);
        res.status(200).json(updatedDivision);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDivision = async (req, res) => {
    try {
        console.log(req.params.id)
        await DivisionService.deleteDivision(req.params.id);

        res.status(200).json({ message: 'Division deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
