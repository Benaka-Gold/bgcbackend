const Division = require('../database/models/Division');

exports.createDivision = async (divisionData) => {
    const division = new Division(divisionData);
    return await division.save();
};

exports.getAllDivisions = async () => {
    return await Division.find();
};

exports.getDivisionById = async (id) => {
    return await Division.findById(id);
};

exports.updateDivision = async (id, updateData) => {
    return await Division.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteDivision = async (id) => {
    await Division.findByIdAndDelete(id);
};
