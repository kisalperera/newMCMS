const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    
    staff_username:{type:String, required: true},
    staff_name:{type:String, required: true},
    staff_address:{type:String, required: true},
    staff_phone:{type:String, required: true},
    staff_password:{type:String, required: true},
    staff_role:{type:String, required: true},
    staff_salary:{type:Number, required: true},

},
{    timestamp: true,}
);

const staff = mongoose.model('staff', staffSchema);

module.exports = staff;