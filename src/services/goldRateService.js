const GoldRate = require('../database/models/GoldRate');

const createGoldRate = async (data) => {
    const goldRate = new GoldRate(data);
    return await goldRate.save();
};

const getGoldRates = async () => {
    return await GoldRate.find();
};

const getGoldRateById = async (id) => {
    return await GoldRate.findById(id);
};

const updateGoldRate = async (id, data) => {
    return await GoldRate.findByIdAndUpdate(id, data, { new: true });
};

const deleteGoldRate = async (id) => {
    return await GoldRate.findByIdAndDelete(id);
};

const update24kRate = async(data) => {
    try {
        const updatedPrice = Number(data)
        const rate = await GoldRate.find({purity : 100})
        await GoldRate.findByIdAndUpdate(rate._id,{price : updatedPrice})
        const prices = await getGoldRates()
        prices.forEach(async(price) => {
            let _updatedPrice = (updatedPrice * price.purity)/100
            await GoldRate.findByIdAndUpdate(price._id,{price : _updatedPrice})
        });
        return true;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createGoldRate,
    getGoldRates,
    getGoldRateById,
    updateGoldRate,
    deleteGoldRate,
    update24kRate,
};
