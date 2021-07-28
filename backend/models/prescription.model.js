const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    consultation_id: {type:String, required: true},   

},
{    timestamp: true,}
);

const prescription = mongoose.model('prescription', prescriptionSchema);

module.exports = prescription;