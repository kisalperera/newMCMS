const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const appoinmentSchema = new Schema({
    patient_id: {type:String, required: true}, 
    doctor_id: {type:String, required: true},    
    date:{type:Date, required: true},
    number: {type:String, required: true},    

},

{    timestamp: true,}
);

const appoinment = mongoose.model('appoinment', appoinmentSchema );

module.exports = appoinment;