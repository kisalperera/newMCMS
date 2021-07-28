const router = require('express').Router();
let prescription = require('../models/prescription.model');


router.route('/addPrescription').post((req,res) => {
    const consultation_id = req.body.consultation_id;
    const newprescription = new prescription({
        consultation_id,
    });
    newprescription.save()
    .then(() => res.json(newprescription._id))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getPrescription/:id').get((req,res)=>{
    prescription.findOne({consultation_id:req.params.id})
    .then(prescription=>res.json(prescription) 
    )
    .catch(err=>res.status(400).json('Error:'));
})

router.route('/deletePrescription/:id').delete((req,res)=>{
    prescription.findByIdAndDelete(req.params.id)
    .then(()=>res.json('items Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;