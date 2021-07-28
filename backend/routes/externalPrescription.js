const router = require('express').Router();
let externalPrescription = require('../models/externalPrescription.model');


router.route('/addExternalPrescription').post((req,res) => {
    const consultation_id = req.body.consultation_id;
    const newExternalPrescription = new externalPrescription({
        consultation_id,
    });
    newExternalPrescription.save()
    .then(() => res.json(newExternalPrescription._id))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getExternalPrescription/:id').get((req,res)=>{
    externalPrescription.findOne({consultation_id:req.params.id})
    .then(externalPrescription=>res.json(externalPrescription) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getAllExP').get((req,res)=>{
    externalPrescription.find()
    .then(externalPrescription=>res.json(externalPrescription) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/deleteExternalPrescription/:id').delete((req,res)=>{
    externalPrescription.deleteOne({externalPrescription_id:req.params.id})
    .then(()=>res.json('items Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;