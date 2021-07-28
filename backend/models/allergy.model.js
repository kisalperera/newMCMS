const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const allergySchema = new Schema({
    patient_id: {type:String, required: true}, 
    allergy_type: {type:String, required: true},    
    allergy_item:{type:String, required: true},   
},
{    timestamp: true,}
);

const allergy = mongoose.model('allergy', allergySchema );

module.exports = allergy;