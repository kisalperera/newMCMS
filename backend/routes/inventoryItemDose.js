const router = require('express').Router();
let inventoryItemDose = require('../models/inventoryItemDose.model');

router.route('/getItemDose').post((req,res)=>{
    inventoryItemDose.find({item_name:req.body.item_name})
        .then(inventoryItemDoses => res.json(inventoryItemDoses.map(item=>item.dose)))
        .catch(err => res.status(400).json('error:' + err));
} );


router.route('/addDose').post((req,res) => {
    const item_name = req.body.item_name;
    const dose =req.body.dose;
    

    const newInventoryItemDose = new inventoryItemDose({
        item_name,
        dose,
    });

    newInventoryItemDose.save()
    .then(() => res.json('Item Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getByNameandDose').post((req,res)=>{
    inventoryItemDose.find({item_name:req.body.item_name} && {dose:req.body.dose})
    .then(inventoryItemDose=>res.json(inventoryItemDose))
    .catch(err=>res.status(400).json('Error: '+err));
})




module.exports = router;