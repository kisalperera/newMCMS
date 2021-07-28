const router = require('express').Router();
let inventoryItem = require('../models/inventoryItem.model');

router.route('/').get((req,res)=>{
    inventoryItem.find()
        .then(inventoryItems => res.json(inventoryItems))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/itemlength').get((req,res)=>{
    inventoryItem.find()
        .then(inventoryItems => res.json(inventoryItems.length))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/add').post((req,res) => {
    const item_name = req.body.item_name;
    const category = req.body.category;
    const strength=req.body.strength;
    const unit_price=Number(req.body.unit_price);
    const selling_price=Number(req.body.selling_price);
    const reorder_level=req.body.reorder_level;

    
    const newInventoryItem = new inventoryItem({
        item_name,
        category,
        strength,
        unit_price,
        selling_price,
        reorder_level
       
    });

    newInventoryItem.save()
    .then(() => res.json('Item Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/:id').get((req,res)=>{
    inventoryItem.findById(req.params.id)
    .then(inventoryItem=>res.json(inventoryItem))
    .catch(err=>res.status(400).json('Error: '+err));
})




 router.route('/:id').delete((req,res)=>{
     inventoryItem.findByIdAndDelete(req.params.id)
     .then(()=>res.json('Item Deleted'))
     .catch(err=>res.status(400).json('Error: '+err));
 })

 router.route('/update/:id').post((req,res)=>{
    inventoryItem.findById(req.params.id)
    .then(inventoryItem=>{
        inventoryItem.item_name=req.body.item_name;
        inventoryItem.category=req.body.category;
        inventoryItem.strength=req.body.strength;
        inventoryItem.unit_price=req.body.unit_price;
        inventoryItem.selling_price=req.body.selling_price;
        inventoryItem.reorder_level=req.body.reorder_level;



        inventoryItem.save()
        .then(()=>res.json('item updated!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/names').get((req,res)=>{
    inventoryItem.find()
        .then(inventoryItems => res.json(inventoryItems.item_name)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/itemCheck').post((req,res)=>{
    inventoryItem.findOne({item_name:req.body.item_name})
        .then(inventoryItems => 
            res.json(inventoryItems.item_name)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/Check').post((req,res)=>{
    inventoryItem.findOne({item_name:req.body.item_name})
        .then(inventoryItems => 
            res.json(inventoryItems.category)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/strength/:value').get((req,res)=>{
    inventoryItem.findOne({item_name:req.params.value})
        .then(inventoryItems => 
            res.json(inventoryItems.strength)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getItem').post((req,res)=>{
    inventoryItem.findOne({item_name:req.body.item_name})
        .then(inventoryItems => 
            res.json(inventoryItems)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getItemByVal/:val').post((req,res)=>{
    inventoryItem.findOne({item_name:req.params.val})
        .then(inventoryItems => 
            res.json(inventoryItems)
        )
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/findpresent').post((req,res)=>{
    const name=req.body.generic_name
    const strength=parseInt(req.body.strength)
    const regex = new RegExp(name, 'i')
    const regex2 = new RegExp(strength, 'i')

    inventoryItem.findOne({item_name:{$regex: regex},strength:{$regex: regex2}})
        .then(inventoryItems => {
            if(inventoryItems.strength>0){
                res.json(inventoryItems)
            }
        })
        .catch(err => res.status(400).json('error:' + err));
} );

module.exports = router;