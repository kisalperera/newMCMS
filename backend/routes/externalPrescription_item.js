const router = require('express').Router();
let externalPrescriptionItems = require('../models/externalPrescription_item.model');


router.route('/addExternalPrescriptionItems').post((req,res) => {
    const externalPrescription_id = req.body.externalPrescription_id;
    const inventoryItem_name = req.body.inventoryItem_name;
    const frequency = req.body.frequency;
    const dose = req.body.dose;
    const duration = req.body.duration;
    const price = req.body.price;


    const newexternalPrescriptionItem = new externalPrescriptionItems({
        externalPrescription_id, 
        inventoryItem_name,  
        frequency,   
        dose,   
        duration,
        price  
    });
    newexternalPrescriptionItem.save()
    .then(() => res.json("added"))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getExternalPrescriptionItem/:id').get((req,res)=>{
    externalPrescriptionItems.find({externalPrescription_id:req.params.id})
    .then(externalPrescriptionItem=>res.json(externalPrescriptionItem) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/getExPItems').get((req,res)=>{
    externalPrescriptionItems.find()
    .then(externalPrescriptionItem=>res.json(externalPrescriptionItem) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/deleteExternalItems/:id').delete((req,res)=>{
    externalPrescriptionItems.deleteMany({externalPrescription_id:req.params.id})
    .then(()=>res.json('items Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})


module.exports = router;