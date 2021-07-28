const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patient_name: {type:String, required: true},
    date_of_birth: {type:Date, required: true},
    gender: {type:String, required: true},
    patient_address: {type:String, required: true},
    patient_phone: {type:String, required: true},
    occupation: {type:String, required: true},
    marital_status: {type:String, required: true},
    children_no: {type:Number, required: true},
    smoking: {type:String, required: true},
    alcohol: {type:String, required: true},    
    assigned_number: {type:String, required: false},
    assigned_doctor: {type:String, required: false}
},
{    timestamp: true,}
);

const patient = mongoose.model('patient', patientSchema);

module.exports = patient;

