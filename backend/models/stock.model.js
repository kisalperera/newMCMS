const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    item_name: {type:String, required: true},
    stock_date: {type:Date, required: false},
    manufacture_date: {type:Date, required: false},
    expire_date:{type:Date, required: false},
    units: {type:Number, required: true},
    supplier: {type:String, required: true},
    stock_id: {type:String, required: true},

},
{    timestamp: true,}
);

const stock = mongoose.model('stock', stockSchema);

module.exports = stock;