const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const docSchema = new Schema({
    
    staff_username:{type:String, required: true},
    staff_name:{type:String, required: true},
    staff_address:{type:String, required: true},
    staff_phone:{type:String, required: true},
    staff_password:{type:String, required: true},
    staff_role:{type:String, required: true},
    title:{type:String, required: true},
    speciality:{type:String, required: true},
    reg_no:{type:String, required: true},
    consult_charge:{type:Number, required: true},
    commission:{type:Number, required: true},
    assiged_number:{type:String, required: true},

},
{    timestamp: true,}
);

const doctor = mongoose.model('doctor', docSchema);

module.exports = doctor;