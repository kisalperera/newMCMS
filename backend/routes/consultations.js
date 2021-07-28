const router = require('express').Router();
let consultation = require('../models/consultation.model');

router.route('/getConsultation').get((req,res)=>{
    consultation.find()
        .then(consultations => res.json(consultations))
        .catch(err => res.status(400).json('error:' + err));
} );



router.route('/addCounsultation').post((req,res) => {

    const patient_id= req.body.patient_id;
    const consultation_date= Date.parse(req.body.consultation_date);
    const complaint= req.body.complaint;
    const complaint_duration=req.body.complaint_duration;
    const pulse= req.body.pulse;
    const blood_pressure= req.body.blood_pressure;
    const heart_sound= req.body.heart_sound;
    const marmers= req.body.marmers;
    const air_entry= req.body.air_entry;
    const crepitation= req.body.crepitation;
    const ronchi= req.body.ronchi;
    const other_exam= req.body.other_exam;
    const diagnosis= req.body.diagnosis;
    const investigations= req.body.investigations;
    const consultation_charge= Number(req.body.consultation_charge);
    const consult_doctor=req.body.consult_doctor;
    const consultation_commission= Number(req.body.consultation_commission);

    const newconsultation = new consultation({
        patient_id,
        consultation_date,
        complaint,
        complaint_duration,
        pulse,
        blood_pressure,
        heart_sound,
        marmers,
        air_entry,
        crepitation,
        ronchi,
        other_exam,
        diagnosis,
        investigations,
        consultation_charge,
        consult_doctor,
        consultation_commission
    });

    newconsultation.save()
    .then(() => res.json(newconsultation))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getConsultationByID/:id').get((req,res)=>{
    consultation.find({patient_id:req.params.id}).sort({
        consultation_date:-1,
    })
    .then(consultation=>res.json(consultation))
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getConsultationByConsultID/:id').get((req,res)=>{
    consultation.findById(req.params.id)
    .then(consultation=>res.json(consultation))
    .catch(err=>res.status(400).json('Error: '+err));
})



router.route('/treatmentConsultation/:id').post((req,res)=>{
    consultation.find({patient_id:req.params.id}).sort({
        consultation_date:-1})
        .then(consultations=>res.json(consultations[0]))
        .catch(err => res.status(400).json('no record:' + err));
} );

module.exports = router;