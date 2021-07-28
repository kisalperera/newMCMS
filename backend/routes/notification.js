const router = require('express').Router();
let notification = require('../models/notifications.model');


router.route('/addNot').post((req,res) => {
    notification.findOneAndDelete({not_item:req.body.not_item})
    .then(()=>{
        console.log("found One")
        const type = req.body.type;
        const not_item = req.body.not_item;
        const not_value = req.body.not_value;
        const status = "new";
    
        const newnotification = new notification({
        type,
        not_item,
        not_value,
        status,
        
        });
        newnotification.save()
        .then(() =>{
            console.log(newnotification);
            res.json(newnotification)})
        .catch(err => res.status(400).json('error:' + err));
    })
    .catch(err => {


        const type = req.body.type;
        const not_item = req.body.not_item;
        const not_value = req.body.not_value;
        const status = "new";
    
        const newnotification = new notification({
        type,
        not_item,
        not_value,
        status,
        
        });
        newnotification.save()
        .then(() =>{
            console.log(newnotification);
            res.json(newnotification)})
        .catch(err => res.status(400).json('error:' + err));
    });

});


router.route('/changeNotstatus/:id').post((req,res) => {
    notification.findById(req.params.id)
    .then(notification=>{
        notification.status = "old";

        notification.save()
        .then(() => res.json(notification))

    })
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getNotbyID/:value').get((req,res)=>{
    notification.find({type:req.params.value})
    .then(notification=>res.json(notification) 
    )
    .catch(err=>res.status(400).json('Error:'));
})


router.route('/getNot').get((req,res)=>{
    notification.find()
    .then(notification=>res.json(notification) 
    )
    .catch(err=>res.status(400).json('Error:'));
})

router.route('/getByStockID').post((req,res)=>{
    notification.findOne({not_item:req.body.stock_id})
    .then(stock=>res.json(stock) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getnewLowStock').get((req,res)=>{
    notification.find({status:"new" , type:"Low Stock"})
    .then(stock=>res.json(stock) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/removefromNot').post((req,res)=>{
    notification.findOneAndDelete({not_item:req.body.stock_id})
    .then(()=> res.json("done"))
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;