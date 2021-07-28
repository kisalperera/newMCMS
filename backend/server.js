const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.local_uri;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true})


const connection = mongoose.connection;
connection.once('open', () =>  {
    console.log("MongoDB connection established successfully");
})

const inventoryItemsRouter = require('./routes/inventoryItems');
const inventoryItemDoseRouter = require('./routes/inventoryItemDose');
const patientsRouter = require('./routes/patients');
const staffRouter = require('./routes/staffs');
const consultationRouter = require('./routes/consultations');
const prescriptionRouter = require('./routes/prescriptions');
const prescriptionItemRouter = require('./routes/prescription_item');
const externalPrescriptionRouter = require('./routes/externalPrescription');
const externalPrescriptionItemRouter = require('./routes/externalPrescription_item');
const stocksRouter = require('./routes/stocks');
const checkoutRouter = require('./routes/checkout');
const allergyRouter = require('./routes/allergy');
const requestRouter = require('./routes/itemRequest');
const supplierRouter = require('./routes/suppliers');
const purchaseRouter = require('./routes/purchaseorders');
const reportRouter = require('./routes/reports');
const appointmentRouter = require('./routes/appointments');
const notificationRouter = require('./routes/notification');


app.use('/reports',express.static('reports')); 

app.use('/inventoryItems',inventoryItemsRouter); 
app.use('/inventoryDoses',inventoryItemDoseRouter); 
app.use('/patients',patientsRouter); 
app.use('/staffs',staffRouter); 
app.use('/consultations',consultationRouter); 
app.use('/prescriptions',prescriptionRouter); 
app.use('/prescriptionItems',prescriptionItemRouter); 
app.use('/externalPrescriptions',externalPrescriptionRouter); 
app.use('/externalPrescriptionItems',externalPrescriptionItemRouter); 
app.use('/stocks',stocksRouter); 
app.use('/checkouts',checkoutRouter); 
app.use('/allergy',allergyRouter); 
app.use('/requests',requestRouter); 
app.use('/suppliers',supplierRouter); 
app.use('/purchases',purchaseRouter); 
app.use('/reports',reportRouter); 
app.use('/appointments',appointmentRouter); 
app.use('/notifications',notificationRouter); 


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})