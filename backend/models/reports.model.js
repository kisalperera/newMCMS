const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    patient_id:{type:String, required: true},
    report_type: {type:String, required: true},
    report_date: {type:String, required: true},
    reportfile: {type:String, required: true},
    description:{type:String, required: true},
    
},
{    timestamp: true,}
);

const report = mongoose.model('report', reportSchema);

module.exports = report;