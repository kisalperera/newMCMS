const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const externalPrescription_itemSchema = new Schema({
    externalPrescription_id: {type:String, required: true}, 
    inventoryItem_name: {type:String, required: true},    
    frequency:{type:String, required: true},   
    dose:{type:String, required: true},   
    duration:{type:String, required: true},  
    price:{type:Number, required: true},   
},
{    timestamp: true,}
);

const externalPrescription_item = mongoose.model('externalPrescription_item', externalPrescription_itemSchema);

module.exports = externalPrescription_item;