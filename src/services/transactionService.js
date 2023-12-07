const Transaction = require('../database/models/transactionModel');

const createTransaction = async (transactionData) => {
  try {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTransactionById = async (transactionId) => {
  try {
    return await Transaction.findById(transactionId);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTransactions = async() =>{
    try{
        return await Transaction.find()
    }
    catch(error){
        throw new Error(error.message)
    }
};

const updateTransaction = async (transactionId, transactionData) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(transactionId, transactionData, { new: true });
    return transaction;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    await Transaction.findByIdAndDelete(transactionId);
    return { message: 'Transaction successfully deleted' };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ... more service functions as necessary

module.exports = {
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactions
  // ... other methods
};
