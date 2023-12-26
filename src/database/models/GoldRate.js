const mongoose = require('mongoose');

const goldRateSchema = mongoose.Schema({
    purity : {
        type : Number,
        required : true,
    },
    purityName : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
})

module.exports = mongoose.model('GoldRate', goldRateSchema);
