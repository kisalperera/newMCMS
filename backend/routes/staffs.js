const router = require('express').Router();
let staff = require('../models/staff.model');
let doctor = require('../models/doctor.model');
let payment = require('../models/payment.model');


router.route('/addPay').post((req,res) => {

    const date=req.body.date;
    const staff_id=req.body.staff_id;
    const amount=Number(req.body.amount);
    
    const newpayment = new payment({
        date,
        staff_id,
        amount,
    });

    newpayment.save()
    .then(() => res.json('Staff Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getStaff').get((req,res)=>{
    staff.find()
        .then(staffs => res.json(staffs))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/checkuser').post((req,res)=>{
    staff.findOne({staff_username:req.body.staff_username})
        .then(staffs => {
            if(staffs==null){
                doctor.findOne({staff_username:req.body.staff_username})
                .then(sts=>{
                    res.json(sts)
                })
            }
            else{res.json(staffs)}
        })
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getDocNumber/:id').get((req,res)=>{
    doctor.findById(req.params.id)
        .then(doctors => res.json(doctors.assiged_number))
        .catch(err => res.status(400).json('error:' + err));
} );


router.route('/getDoc').get((req,res)=>{
    doctor.find()
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getDocByID/:id').get((req,res)=>{
    doctor.findById(req.params.id)
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/getDocByName/:value').get((req,res)=>{
    doctor.findOne({staff_name:req.params.value})
        .then(doctors => res.json(doctors))
        .catch(err => res.status(400).json('error:' + err));
} );


router.route('/addDoc').post((req,res) => {

    const staff_username=req.body.staff_username;
    const staff_name=req.body.staff_name;
    const staff_address=req.body.staff_address;
    const staff_phone=req.body.staff_phone;
    const staff_password=req.body.staff_password;
    const staff_role=req.body.staff_role;
    const title=req.body.title;
    const speciality=req.body.speciality;
    const reg_no=req.body.reg_no;
    const consult_charge=req.body.consult_charge;
    const commission=req.body.commission;
    const assiged_number=req.body.assiged_number;

    const newdoctor = new doctor({
        staff_username,
        staff_name,
        staff_address,
        staff_phone,
        staff_password,
        staff_role,
        title,
        speciality,
        reg_no,
        consult_charge,
        commission,
        assiged_number
    });

    newdoctor.save()
    .then(() => res.json('Staff Added!'))
    .catch(err => res.status(400).json('error:' + err));
});


router.route('/addStaff').post((req,res) => {

    const staff_username=req.body.staff_username;
    const staff_name=req.body.staff_name;
    const staff_address=req.body.staff_address;
    const staff_phone=req.body.staff_phone;
    const staff_password=req.body.staff_password;
    const staff_role=req.body.staff_role;
    const staff_salary=Number(req.body.staff_salary);

    const newstaff = new staff({
        staff_username,
        staff_name,
        staff_address,
        staff_phone,
        staff_password,
        staff_role,
        staff_salary
    });

    newstaff.save()
    .then(() => res.json('Staff Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getStaffByID/:id').get((req,res)=>{
    staff.findById(req.params.id)
    .then(staff=>res.json(staff))
    .catch(err=>res.status(400).json('Error: '+err));
})

 router.route('/deleteStaffByID/:id').delete((req,res)=>{
     staff.findByIdAndDelete(req.params.id)
     .then(()=>res.json('Staff Deleted'))
     .catch(err=>res.status(400).json('Error: '+err));
 })

 router.route('/updateStaffByID/:id').post((req,res)=>{
    staff.findById(req.params.id)
    .then(staff=>{
        staff.staff_username=req.body.staff_username;
        staff.staff_name=req.body.staff_name;
        staff.staff_address=req.body.staff_address;
        staff.staff_phone=req.body.staff_phone;
        staff.staff_role=req.body.staff_role;
        // staff.staff_password=req.body.staff_password;


        staff.save()
        .then(()=>res.json('Staff updated!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/reset').post((req,res)=>{
    staff.findOne({staff_username:req.body.staff_username}&&{staff_password:req.body.current_password})
    .then(staff=>{
            staff.staff_password=req.body.new_password;
            staff.save() 
            .then(()=>res.json('true'))
          
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/login').post((req,res)=>{
    staff.findOne({staff_username:req.body.staff_username})
    .then(staff=>{
        if(staff.staff_password==req.body.staff_password){
            return res.json(staff)     
          }
        else{return res.json('Password incorrect!')}
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/logindoc').post((req,res)=>{
    doctor.findOne({staff_username:req.body.staff_username})
    .then(staff=>{
        if(staff.staff_password==req.body.staff_password){
            return res.json(staff)     
          }
        else{return res.json('Password incorrect!')}
    })
    .catch(err=>res.status(400).json('Error: '+err));
})





module.exports = router;  