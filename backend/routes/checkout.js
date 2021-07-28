const router = require('express').Router();
let checkout = require('../models/checkout.model');


router.route('/addcheckout').post((req,res) => {
    const invoice_id=req.body.invoice_id; 
    const invoice_date=req.body.invoice_date;    
    const consultation_id=req.body.consultation_id;   
    const consultation_charge=req.body.consultation_charge;   
    const prescription_id=req.body.prescription_id;  
    const discount=req.body.discount;   
    const total=req.body.total;   
    const pay_method=req.body.pay_method;


    const newcheckout = new checkout({

        invoice_id,
        invoice_date,
        consultation_id,
        consultation_charge,
        prescription_id,
        discount,
        total,
        pay_method

    });
    newcheckout.save()
    .then(() => res.json(newcheckout._id))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/getcheckout/').post((req,res)=>{
    checkout.findOne({invoice_id:req.body.invoice_id})
    .then(checkout=>res.json(checkout) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getcheck/:id').get((req,res)=>{
    checkout.findOne({consultation_id:req.params.id})
    .then(checkout=>res.json(checkout) 
    )
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;