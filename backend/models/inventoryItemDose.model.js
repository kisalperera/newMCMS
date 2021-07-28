const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const inventoryItemDoseSchema = new Schema({
    item_name: {type:String, required: true},
    dose: {type:String, required: true},
    
},
{    timestamp: true,}
);

const inventoryItemDose = mongoose.model('inventoryItemDose', inventoryItemDoseSchema);

module.exports = inventoryItemDose;