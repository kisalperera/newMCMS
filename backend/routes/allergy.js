const router = require('express').Router();
let allergy = require('../models/allergy.model');


router.route('/addallergy').post((req,res) => {
    const patient_id = req.body.patient_id;
    const allergy_type = req.body.allergy_type;
    const allergy_item = req.body.allergy_item;

    const newallergy = new allergy({
        patient_id,
        allergy_type,
        allergy_item,
    });
    newallergy.save()
    .then(() => res.json(newallergy))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getDrugallergy/:id').get((req,res)=>{
    allergy.find({patient_id:req.params.id})
    .then(allergy=>res.json(allergy.filter(el=>el.allergy_type=="Drug Allergy")) 
    )
    .catch(err=>res.status(400).json('Error:'));
})

router.route('/getFoodallergy/:id').get((req,res)=>{
    allergy.find({patient_id:req.params.id})
    .then(allergy=>res.json(allergy.filter(el=>el.allergy_type=="Food Allergy")) 
    )
    .catch(err=>res.status(400).json('Error:'));
})

router.route('/checkallergy/:id').post((req,res)=>{
    allergy.find({patient_id:req.params.id})
    .then(allergy=>
        res.json(allergy.filter(el=>el.allergy_item==req.body.allergy_item).length) 
    )
    .catch(err=>res.status(400).json('Error:'));
})



module.exports = router;