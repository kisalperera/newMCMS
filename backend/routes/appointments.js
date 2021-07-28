const router = require('express').Router();
let appoinments = require('../models/appointments.model');

router.route('/getAppointment').get((req,res)=>{
    appoinments.find()
        .then(app => res.json(app))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getNumbers').post((req,res)=>{
    appoinments.find({doctor_id:req.body.doctor_id})
        .then(app =>
            {   var DatesNum=0;
                for(let i=0;i<app.length;i++){
                    if(app[i].date.toLocaleDateString()==req.body.date.toLocaleString()){
                        DatesNum++;
                    }
                }
                res.json(DatesNum+1)
            })
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/addAppointment').post((req,res) => {
    const patient_id=req.body.patient_id; 
    const doctor_id=req.body.doctor_id;    
    const date=req.body.date;      
    const number=req.body.number;   

   
    const newappointment = new appoinments({
        patient_id,
        doctor_id,
        date,
        number
    });
    newappointment.save()
    .then(() => res.json(newappointment._id))
    .catch(err => res.status(400).json('error:' + err));
});

module.exports = router;