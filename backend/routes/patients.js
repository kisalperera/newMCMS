const router = require('express').Router();
let patient = require('../models/patient.model');

router.route('/getPatient').get((req,res)=>{
    patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getNextNumber').post((req,res)=>{
    patient.find({assigned_doctor:req.body.assigned_doctor}).sort({
        assigned_number:-1,
    })
        .then((patients) =>{ 
            console.log(patients)

            let matches =patients[0].assigned_number.match(/(\d+)/);
            let nextNumber = Number(matches[0]) +1;
            
            res.json(nextNumber)})
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getallNumbers').get((req,res)=>{
    patient.find({assigned_number:{$ne: "0"}}).sort({
        assigned_number:+1,
    })
        .then(patients =>{ 
            // console.log(patients)

            // let matches =patients[0].assigned_number.match(/(\d+)/);
            // let nextNumber = Number(matches[0]) +1;
            
            res.json(patients)
        })
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/addPatient').post((req,res) => {
    const patient_name = req.body.patient_name;
    const date_of_birth =Date.parse(req.body.date_of_birth);
    const gender = req.body.gender;
    const patient_address = req.body.patient_address;
    const patient_phone = req.body.patient_phone;
    const occupation = req.body.occupation;
    const marital_status = req.body.marital_status;
    const children_no =Number(req.body.children_no);
    const smoking = req.body.smoking;
    const alcohol = req.body.alcohol;
    const assigned_number =Number(req.body.assigned_number);
    const assigned_doctor =""


    const newPatient = new patient({
        patient_name,
        date_of_birth,
        gender,
        patient_address,
        patient_phone,
        occupation,
        marital_status,
        children_no,
        smoking,
        alcohol,
        assigned_number,
        assigned_doctor
    });

    newPatient.save()
    .then(() => res.json('Patient Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getPatientByID/:id').get((req,res)=>{
    patient.findById(req.params.id)
    .then(patient=>res.json(patient))
    .catch(err=>res.status(400).json('Error: '+err));
})


 router.route('/updatePatient/:id').post((req,res)=>{
    patient.findById(req.params.id)
    .then(patient=>{
        patient.patient_name = req.body.patient_name;
        patient.date_of_birth =Date.parse(req.body.date_of_birth);
        patient.gender = req.body.gender;
        patient.patient_address = req.body.patient_address;
        patient.patient_phone = req.body.patient_phone;
        patient.occupation = req.body.occupation;
        patient.marital_status = req.body.marital_status;
        patient.children_no =Number(req.body.children_no);
        patient.smoking = req.body.smoking;
        patient.alcohol = req.body.alcohol;

        patient.save()
        .then(()=>res.json('Patinet updated!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/assignNumber/:id').post((req,res)=>{
    patient.findById(req.params.id)
    .then(patient=>{
        patient.assigned_doctor =req.body.assigned_doctor  ;
        patient.assigned_number =req.body.assigned_number ;
        patient.save()
        .then(()=>res.json('Number Assigned!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/getPatiendID').post((req,res)=>{
    patient.findOne({assigned_number:req.body.assigned_number})
    .then(patient=>res.json(patient))
    .catch(err=>res.status(400).json('Error: '+err));
})  


router.route('/getLeastNumber').post((req,res)=>{
    patient.find({assigned_doctor:req.body.assigned_doctor}).sort({
        assigned_number:+1,
    })
        .then((patients) =>{ 
            for(var x=0;x<patients.length;x++){
                if(patients[x].assigned_number!=0){break;}            
            }
            res.json(patients[x].assigned_number)})
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/finishPatient/:id').post((req,res)=>{
    patient.findById(req.params.id)
    .then(patient=>{
        patient.assigned_number = 0;
        patient.assigned_doctor = "";

        patient.save()
        .then(()=>res.json(patient))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


module.exports = router;