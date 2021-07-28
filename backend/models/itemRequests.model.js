const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const itemRequestSchema = new Schema({
    generic_name: {type:String, required: true}, 
    type: {type:String, required: true},    
    strength: {type:String, required: true},    
    description:{type:String, required: true},
    doctor_name:{type:String, required: true}, 
    status:{type:String, required: true},   
  
   
},
{    timestamp: true,}
);

const itemRequest = mongoose.model('itemRequest', itemRequestSchema );

module.exports = itemRequest;