const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
    item_name: {type:String, required: true},
    strength: {type:String, required: true},
    category: {type:String, required: true},
    unit_price: {type:Number, required: true},
    selling_price: {type:Number, required: true},
    quantity:{type:Number},
    reorder_level:{type:String},

},
{    timestamp: true,}
);

const inventoryItem = mongoose.model('inventoryItem', inventoryItemSchema);

module.exports = inventoryItem;