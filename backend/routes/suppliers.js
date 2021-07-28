const router = require('express').Router();
let supplier = require('../models/supplier.model');

router.route('/getSupplier').get((req,res)=>{
    supplier.find()
        .then(suppliers => res.json(suppliers))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getSupplierName').post((req,res)=>{
    supplier.findOne({supplier_name:req.body.supplier_name})
        .then(suppliers => res.json(suppliers))
        .catch(err => res.status(400).json('error:' + err));
} );


router.route('/addSupplier').post((req,res) => {
    const supplier_name = req.body.supplier_name;
    const supplier_email = req.body.supplier_email;
    const supplier_phone =req.body.supplier_phone;
    const supplier_address =req.body.supplier_address;
    const supplier_items =req.body.supplier_items;


    const newsupplier = new supplier({
        supplier_name,
        supplier_email,
        supplier_phone,
        supplier_address,
        supplier_items
      
    });

    newsupplier.save()
    .then(() => res.json('supplier Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getSupplierByID/:id').get((req,res)=>{
    supplier.findById(req.params.id)
    .then(supplier=>res.json(supplier))
    .catch(err=>res.status(400).json('Error: '+err));
})

 router.route('DeleteSupplierByID/:id').delete((req,res)=>{
     supplier.findByIdAndDelete(req.params.id)
     .then(()=>res.json('supplier Deleted'))
     .catch(err=>res.status(400).json('Error: '+err));
 })

 router.route('/updateSupplierByID/:id').post((req,res)=>{
    supplier.findById(req.params.id)
    .then(supplier=>{
        supplier.supplier_name=req.body.supplier_name;
        supplier.supplier_email=req.body.supplier_email;
        supplier.supplier_phone=req.body.supplier_name;
        supplier_address =req.body.supplier_address;
        supplier_items =req.body.supplier_items;

        supplier.save()
        .then(()=>res.json('supplier updated!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

module.exports = router;