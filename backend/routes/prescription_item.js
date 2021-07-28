const router = require('express').Router();
let prescriptionItem = require('../models/prescription_item.model');


router.route('/addPrescriptionItems').post((req,res) => {
    const prescription_id = req.body.prescription_id;
    const inventoryItem_name = req.body.inventoryItem_name;
    const frequency = req.body.frequency;
    const dose = req.body.dose;
    const duration = req.body.duration;
    const price = req.body.price;


    const newprescriptionItem = new prescriptionItem({
        prescription_id, 
        inventoryItem_name,  
        frequency,   
        dose,   
        duration,
        price,  
    });
    newprescriptionItem.save()
    .then(() => res.json("added"))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getPrescriptionItem/:id').get((req,res)=>{
    prescriptionItem.find({prescription_id:req.params.id})
    .then(prescriptionItem=>res.json(prescriptionItem) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/deleteItems/:id').delete((req,res)=>{
    prescriptionItem.deleteMany({prescription_id:req.params.id})
    .then(()=>res.json('items Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})


module.exports = router;