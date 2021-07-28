const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
    supplier_name: {type:String, required: true},
    notes: {type:String, required: true},
    order_items: {type:Object, required: true},  
    purchase_id:{type:String, required: true},
    purchase_date: {type:String, required: true},

  
},
{    timestamp: true,}
);

const purchaseOrder = mongoose.model('purchaseOrder', purchaseOrderSchema);

module.exports = purchaseOrder;