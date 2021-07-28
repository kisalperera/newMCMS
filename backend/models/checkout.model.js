const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
    invoice_id: {type:String, required: true}, 
    invoice_date: {type:Date, required: true},    
    consultation_id:{type:String, required: true},   
    consultation_charge:{type:Number, required: true},   
    prescription_id:{type:String, required: true},  
    discount:{type:Number, required: true},   
    total:{type:Number, required: true},   
    pay_method:{type:String, required: true},   

},
{    timestamp: true,}
);

const checkout = mongoose.model('checkout', checkoutSchema);

module.exports = checkout;