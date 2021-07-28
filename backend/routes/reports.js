const router = require('express').Router();
let report = require('../models/reports.model');
const multer  = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, './reports')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '--' + file.originalname)
    }
  })

const upload = multer({ storage:fileStorageEngine })

router.post('/uploadReport', upload.single("file"),  (req, res, next)=> {
    console.log(req.file.filename);
    res.send(req.file.filename);
  })

  router.route('/addreport').post((req,res) => {

    const patient_id=req.body.patient_id;
    const report_type=req.body.report_type;
    const report_date=req.body.report_date;
    const reportfile=req.body.reportfile;
    const description=req.body.description;

    const newReport = new report({
        patient_id,
        report_type,
        report_date,
        reportfile,
        description,
    });

    newReport.save()
    .then(() => res.json(' Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getReport/:id').get((req,res)=>{
    report.find({patient_id:req.params.id})
    .then(reports=>res.json(reports) 
    )
    .catch(err=>res.status(400).json('Error:'));
})

module.exports = router;