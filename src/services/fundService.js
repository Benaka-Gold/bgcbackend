const Fund = require('../database/models/Fund');

exports.createFund = async (fundData) => {
    const fund = new Fund(fundData);
    return await fund.save();
};

exports.getFundById = async (id) => {
    return await Fund.findById(id);
};

exports.updateFund = async (id, updateData) => {
    return await Fund.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteFund = async (id) => {
    return await Fund.findByIdAndDelete(id);
};

exports.getAllFunds = async() => {
    return await Fund.find();
}