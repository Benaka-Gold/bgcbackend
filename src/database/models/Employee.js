// src/database/models/Employee.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    empCode: {
        type : String,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fatherName: {
        type : String,
        required : false
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    team : {type : mongoose.Schema.Types.ObjectId,ref : 'Team', default : null},
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'FileUpload'
    },
    documents: [{
        docType: {
            type: String,
        },
        docFile: {
            type: Schema.Types.ObjectId,
            ref: 'FileUpload'
        }
    }],
    position: String,
    department: String,
    dateHired: {
        type: Date,
        default: Date.now
    },
    userId: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    division : String,
    status : String,
},{timestamps : true});

module.exports = mongoose.model('Employee', employeeSchema);
