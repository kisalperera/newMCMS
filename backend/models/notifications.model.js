const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    
    type:{type:String, required: true},
    not_item:{type:String, required: true},
    not_value:{type:String, required: true},
    status:{type:String, required: true},
    

},
{    timestamp: true,}
);

const notification = mongoose.model('notification', notificationSchema);

module.exports = notification;