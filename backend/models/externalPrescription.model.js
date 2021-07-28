const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const externalPrescriptionSchema = new Schema({
    consultation_id: {type:String, required: true},   

},
{    timestamp: true,}
);

const externalPrescription = mongoose.model('externalPrescription', externalPrescriptionSchema);

module.exports = externalPrescription;