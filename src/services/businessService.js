const Business = require('../database/models/Business');
const { getOrnamentsByCustomerId } = require('./ornamentService');
const createBusiness = async (data) => {
    const business = new Business(data);
    return await business.save();
};

const getAllBusinesses = async () => {
    return await Business.find()
    .populate({path : 'leadId',populate : {path : 'assignedTo',select : 'name'}})
    .populate('customerId')
    .populate({path : 'taskId', populate : {path : 'assignedTo',select : 'name'}});
};

const getTodayBusinesses = async() => {
    return await Business.find()
    .populate({path : 'leadId',populate : {path : 'assignedTo',select : 'name'}})
    .populate('customerId')
    .populate({path : 'taskId', populate : {path : 'assignedTo',select : 'name'}});
}

const getBusinessById = async (id) => {
    const business =  await Business.findById(id)
    return business
};

const updateBusiness = async (id, data) => {
    try {
        if(data.status === 'acc_purchase_approved') {
        const business = await Business.findById(id)
        // business.serviceAmount = (business.grossAmount + business.releasingAmount) * 0.03
        business.totalAmount = business.grossAmount - (business.releasingAmount + business.serviceAmount)
        business.status = "Finished"
        business.save()
        return business;
        } 
        else {
            return await Business.findByIdAndUpdate(id, data, { new: true });
        }
    }
    catch(error){
        console.log(error)
        throw error;
    }
};

const deleteBusiness = async (id) => {
    return await Business.findByIdAndDelete(id);
};

const getBusinessByPeriod = async (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    // Ensure that the endDate includes the entire day
    endDate.setHours(23, 59, 59, 999);

    return await Business.find({
        createdAt: {
            $gte: startDate,  
            $lte: endDate    
        }
    }).populate('customerId taskId division branchId')
};

const generateBill = async(id) =>{
    
    try{
        const business = await Business.findById(id).populate('customerId branchId')
        const ornaments = await getOrnamentsByCustomerId(business.customerId._id,id)
        return {business,ornaments}
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createBusiness,
    getAllBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    getBusinessByPeriod,
    generateBill
};