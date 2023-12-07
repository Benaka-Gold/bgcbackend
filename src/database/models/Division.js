const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema ({
    divisionName : {
        type : String,
        enum : ['Bangalore','Rest of Karnataka','Andhra', 'Tamil Nadu','Telangana'],
        required : true,
        default : null
    }
})

module.exports = mongoose.model('Division', DivisionSchema);
