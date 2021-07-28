const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplier_name: {type:String, required: true},
    supplier_email: {type:String, required: true},
    supplier_phone: {type:String, required: true},
    supplier_address: {type:String, required: true},
    supplier_items: {type:Object, required: true},    
},
{    timestamp: true,}
);

const supplier = mongoose.model('supplier', supplierSchema);

module.exports = supplier;