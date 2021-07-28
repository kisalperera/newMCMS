const router = require('express').Router();
let purchase = require('../models/purchaseorder.model');
const nodemailer = require('nodemailer');
const { table } = require('console');

const trasnsporter = nodemailer.createTransport({
    service:'hotmail',
    auth:{
        user:"pererakk_im17053@stu.kln.ac.lk",
        pass:"lionsroar"
    }
});


router.route('/return').post((req,res)=>{
    purchase.findOne({_id:req.body.PurchaseID})
    .then(purchase=>{
        purchase.order_items=purchase.order_items.filter(el=>el.item!==req.body.name)

        purchase.save()
        .then(()=>{
            const options ={
                from:"pererakk_im17053@stu.kln.ac.lk",
                to:"kisalperera999@gmail.com",
                subject:"Medica - Item Return", 
                html:'<p>The item '+req.body.name+' will be returned back to you</p>'
            }
        
            trasnsporter.sendMail(options, function(err,info){
                if(err){console.log(err);}
                console.log(info);})
                res.json('Returned!')
             })
             .catch(err=>res.status(400).json('Error:' +err));

       
    })
    .catch(err=>res.status(400).json('Error:' +err));


} );

router.route('/confirmed').post((req,res)=>{
    purchase.findOne({_id:req.body.PurchaseID})
    .then(purchase=>{
        purchase.order_items=purchase.order_items.filter(el=>el.item!==req.body.name)

        purchase.save()
        .then(()=>{res.json('confirmed!')})
        .catch(err => res.status(400).json('error:' + err));
} )        
.catch(err => res.status(400).json('error:' + err))
})

router.route('/getpurchase').get((req,res)=>{
    purchase.find()
        .then(purchases => res.json(purchases))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/addpurchase').post((req,res) => {
    const purchase_id=req.body.purchase_id;
    const supplier_name = req.body.supplier_name;
    const notes = req.body.notes;
    const order_items =req.body.order_items;
    const purchase_date =req.body.purchase_date;

    
    const newpurchase = new purchase({
        purchase_id,
        supplier_name,
        notes,
        order_items,
        purchase_date
              
    });

    newpurchase.save()
    .then(() => {

    const body1='<h4 style="color:black;">Please find the purchase order here,<br/><br/></h4>'; 
    const body2='<br/><br/>Thank You!';

    var batta = new Promise((resolved,reject)=>{
        var body3='<table border="2"><th>Item</th><th>Units</th>';
        req.body.order_items.
        forEach(element => {
            body3=body3+'<tr><td>'+element.item+'</td><td>'+element.units+'</td></tr>'
        })
        resolved (body3)
    })
    batta.then(res2=>{
        var status;
        // rahulge map 
        const options ={
            from:"pererakk_im17053@stu.kln.ac.lk",
            to:req.body.supplier_email,
            subject:"Medica - Purchase Order", 
            html:body1+res2+"</table><br/>"+"Notes: "+req.body.notes+body2
        };
    
        trasnsporter.sendMail(options, function(err,info){
            if(err){console.log(err);
                res.status(500).send({status: 'FAIL', msg: 'Internal error: email not sent'})
            }
            else{
                res.status(200).json({status: 'OK', msg: 'Email sent'})

            }
            console.log(info);})
        },()=>{
        res.json("status")
        })  
    
})
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getpurchaseByID/:id').get((req,res)=>{
    purchase.findById(req.params.id)
    .then(purchase=>res.json(purchase.order_items))
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/getpurchaseByIDDetails/:id').get((req,res)=>{
    purchase.findById(req.params.id)
    .then(purchase=>res.json(purchase))
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/deletepurchase/:id').delete((req,res)=>{
    purchase.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Item Deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
})
 

 
router.route('/getnextID').get((req,res)=>{
    const date=new Date()
    const date2 =date.toString().substring(4,15)

    purchase.find({purchase_date:date2})
    .then(purchase=>res.json(purchase.length+1))
    .catch(err=>res.status(400).json('Error: '+err));
})



module.exports = router;