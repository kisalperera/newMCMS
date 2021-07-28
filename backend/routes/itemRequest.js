const router = require('express').Router();
let itemRequest = require('../models/itemRequests.model');


router.route('/additemRequests').post((req,res) => {
    const generic_name = req.body.generic_name;
    const type = req.body.type;
    const strength = req.body.strength;
    const description = req.body.description;
    const doctor_name = req.body.doctor_name;
    const status="new";

    const newitemRequest = new itemRequest({
        generic_name, 
        type,  
        strength,   
        description,   
        doctor_name,
        status
    });
    newitemRequest.save()
    .then(() => res.json("added"))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getitemRequest').get((req,res)=>{
    itemRequest.find()
    .then(itemRequest=>res.json(itemRequest) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/deleterequest/:id').delete((req,res)=>{
    itemRequest.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Item Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/view').post((req,res) => {
    itemRequest.findOne({generic_name:req.body.generic_name})
    .then(request=>{
        request.status="old";

        request.save()
    .then(() => res.json("added"))
    .catch(err => res.status(400).json('error:' + err));
})
.catch(err=>res.status(400).json('Error: '+err));
})


router.route('/getnewRequest').get((req,res)=>{
    itemRequest.find({status:"new"})
    .then(itemRequest=>res.json(itemRequest) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getnewRequestCount').get((req,res)=>{
    itemRequest.find({status:"new"})
    .then(itemRequest=>res.json(itemRequest.length) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getoldRequest').get((req,res)=>{
    itemRequest.find({status:"old"})
    .then(itemRequest=>res.json(itemRequest) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})


module.exports = router;