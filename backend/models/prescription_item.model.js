const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const prescription_itemSchema = new Schema({
    prescription_id: {type:String, required: true}, 
    inventoryItem_name: {type:String, required: true},    
    frequency:{type:String, required: true},   
    dose:{type:String, required: true},   
    duration:{type:String, required: true},  
    price:{type:Number, required: true},   
 
  
},
{    timestamp: true,}
);

const prescription_item = mongoose.model('prescription_item', prescription_itemSchema);

module.exports = prescription_item;