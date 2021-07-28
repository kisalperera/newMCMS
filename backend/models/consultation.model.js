const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
    patient_id: {type:String, required: true},
    consultation_date: {type:Date, required: false},
    complaint: {type:String, required: true},
    complaint_duration:{type:String, required: true},
    pulse: {type:String, required: true},
    blood_pressure: {type:String, required: true},
    heart_sound: {type:String, required: true},
    marmers: {type:String, required: true},
    air_entry: {type:String, required: true},
    crepitation: {type:String, required: true},
    ronchi: {type:String, required: true},
    other_exam: {type:String, required: false},
    diagnosis: {type:String, required: true},
    investigations: {type:Object, required: false},
    consultation_charge: {type:Number, required: false},
    consultation_commission: {type:Number, required: false},
    consult_doctor:{type:String, required: true},

},
{    timestamp: true,}
);

const consultation = mongoose.model('consultation', consultationSchema);

module.exports = consultation;