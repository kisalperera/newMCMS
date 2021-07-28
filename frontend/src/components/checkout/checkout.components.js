import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';
import { jsPDF } from "jspdf";



const InternalPrescription = props=>(


    <tr>
        <td>{props.internalPrescription.inventoryItem_name}</td>
        <td>{props.internalPrescription.frequency}</td>
        <td>{props.internalPrescription.dose}</td>
        <td>{props.internalPrescription.duration}</td>
        <td style={{fontWeight:700}}>Rs: {props.internalPrescription.price}</td>
        
        
    </tr>
)


class IssueDrugs extends Component {
  constructor(props) {
    super(props);
    
    this.prescriptionList =this.prescriptionList.bind(this);
    this.onChangeNumber =this.onChangeNumber.bind(this);
    this.onClickSearch =this.onClickSearch.bind(this);
    this.onChangeTotal =this.onChangeTotal.bind(this);
    this.onChangeDiscount =this.onChangeDiscount.bind(this);
    this.units =this.units.bind(this);
    this.onChangeMethod =this.onChangeMethod.bind(this);
    this.onClickProceed =this.onClickProceed.bind(this);
    this.generateReport =this.generateReport.bind(this);
    this.createPDF =this.createPDF.bind(this);




    this.state = {
        discount:0,
        number:1,
        assigned_number:0,
        prescriptionID:'null',
        prescriptionItems:[],
        patient:[],
        consultID:'',
        total:0,
        consult_charge:0,
        age_now:0,
        nowExternalItem:[],
        times:0,
        prestotal:0,
        invoice:"",
        number:1,
        pay_method:'Cash',
        patient_name:'',
        gender:'',
        allnumbers:'',
        currentIndex:'',
        stillatDoc:'',
        hide:'',
        noone:''

    };
  }

generateReport(){
    var doc = new jsPDF('portrait','pt','a4','false');
    doc.setFontSize(5);
    doc.html(document.querySelector("#report1"),{
    callback:function(pdf){
         pdf.save("Invoice.pdf");
    }
})     
}

createPDF() {
    // get elements of report data
    var report1 = document.getElementById("report1").innerHTML;

    var style = "<style>";
    style =
        style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
    style =
        style +
        "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");

    win.document.write("<title>Report 1</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write(report1);
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");

    win.document.close(); // CLOSE THE CURRENT WINDOW.

    win.print(); // PRINT THE CONTENTS.
}

 onClickProceed(){

const invoice={
    invoice_id:this.state.invoice,
    invoice_date:Date().toLocaleString(),
    consultation_id:this.state.consultID,
    consultation_charge:this.state.consult_charge,
    prescription_id:this.state.prescriptionID,
    discount:this.state.discount,
    total:this.state.total,
    pay_method:'cash'
}
console.log(invoice);
this.setState({
    hide:true
},()=>{
    this.generateReport()
})
// this.createPDF()

    axios.post('http://localhost:5000/checkouts/addcheckout',invoice)
    .then(res=>{

        axios.post('http://localhost:5000/patients/finishPatient/'+this.state.patient._id)
        .then(res=>{
            swal("Checkout Successful", "Patient visit concluded", "success",{
                buttons: {
                    OK: {value:"OK"},
                  }
            })
            .then((value) => {
                switch (value) {
                  case "OK":
                    this.setState({
                        hide:""
                    })
                    if(this.state.allnumbers.length>Number(this.state.currentIndex)+1){
                    this.setState({
                        number:this.state.allnumbers[Number(this.state.currentIndex)+1].assigned_number,
                        discount:0,
                        currentIndex:Number(this.state.currentIndex)+1
                    },()=>{this.onClickSearch()}
                    )
                }else{
                    this.setState({noone:true})
                } 
            
                    break;
        
                }
              });              
        })
    })
 } 

 onChangeMethod(e){
     this.setState({
         pay_method:e.target.value
     })
 }

  presTotal(){
    if(this.state.prescriptionItems.length>0){
        var x=0;
        for(let i=0;i<this.state.prescriptionItems.length;i++){
                x=x+Number(this.state.prescriptionItems[i].price)
        }
        this.setState({
            prestotal:x
        })
    }
    else{this.setState({
        prestotal:''
    })} 
  }

units(item,freq,dose,dur){
    
    var strength;
    var times;

    return (axios.get('http://localhost:5000/inventoryItems/strength/'+item)
        .then(res=>{
            return res.data;          
        }));
}

onChangeDiscount(e){
    let amount = parseFloat(e.target.value);
    if (isNaN(amount) || amount < 0) {amount = 0;}
    this.setState({discount: amount},()=>{this.onChangeTotal()});
}

componentDidMount(){
    axios.get('http://localhost:5000/patients/getallNumbers')
    .then(res=>{
console.log(res.data)   
if(res.data.length>0)  { 

 this.setState({
     allnumbers:res.data,
     number:res.data[0].assigned_number,
     currentIndex:0
    })
    this.onClickSearch();
 }else{this.setState({noone:true})}
    })
}

onChangeNumber(e){
    this.setState({ 
        number: e.target.value 
    });
  }

onChangeTotal() {    console.log("to check total");

if(this.state.prescriptionItems.length>0){
    console.log("to check total");

    var x=0;
    for(let i=0;i<this.state.prescriptionItems.length;i++){
            x=x+Number(this.state.prescriptionItems[i].price)
    }
    this.setState({
        total:x+Number(this.state.consult_charge)-Number(this.state.discount)
    })
}
else{
    console.log("to check total");

    this.setState({
    total:Number(this.state.consult_charge)-Number(this.state.discount)
})
}
} 
  
onClickSearch(){  

    const num={
        assigned_number:this.state.number
    }

        
    axios.post('http://localhost:5000/patients/getPatiendID',num)
    .then(res=>{
        this.setState({
            patient:res.data,
            patient_name:res.data.patient_name,
            gender:res.data.gender
        
        },()=>{
            var today = new Date();
            var birthDate = new Date(this.state.patient.date_of_birth); 
            this.setState({age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())})
        })
console.log(this.state.patient);
            axios.post('http://localhost:5000/consultations/treatmentConsultation/'+res.data._id)
            .then(resp => {

                axios.get('http://localhost:5000/checkouts/getcheck/'+resp.data._id)
                .then(resp2 => { 
                    if(resp2.data==null){
                        this.setState({stillatDoc:"" }) 
                    }
                    else{
                        this.setState({stillatDoc:"yes"}) 
                    }
                 }).catch(err=>{console.log(err)})

                this.setState({
                    consultID:resp.data._id,
                    consult_charge:resp.data.consultation_charge
                    
                }) 
                 axios.get('http://localhost:5000/prescriptions/getPrescription/'+resp.data._id)
                    .then(response => {
                        this.setState({
                            prescriptionID:response.data._id
                        })
                        axios.get('http://localhost:5000/prescriptionItems/getPrescriptionItem/'+response.data._id)
                        .then(reply => {
                            this.setState({
                                prescriptionItems:reply.data                                
                        },()=>{
                            this.onChangeTotal();
                            this.presTotal()
                        })        

                        }).catch(err =>{console.log('Error');})
                    }).catch(err =>{
                        this.onChangeTotal();
                        console.log('Error');})
            }).catch(err =>{console.log('Error');})
    }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        this.setState({
            patient_name:'',
            gender:'',
            age_now:'',
            prescriptionItems:[],
            prestotal:'',
            total:'',
            discount:'',
            consult_charge:''

        
        })
    })


    this.setState({
        invoice: new Date().toLocaleString().substring(0,9)+"-"+this.state.number
    })
}

prescriptionList(){
    if(this.state.prescriptionItems.length>0){
    return this.state.prescriptionItems.map(currentItem =>{
        return<InternalPrescription internalPrescription={currentItem} onChangeTotal={this.onChangeTotal} 
        units={this.units} key={currentItem._id}
        />;
    })
    }
    else{return ("No Items Available");}
}


  render() {

    var today= new Date()

    return (
        <div>
        {(this.state.noone==true)
        ?<h6>No patients has been assigned a number!</h6>
:<div>
<div className="row ">
         <div className="col-1"style={{marginRight:-30,marginLeft:30}}>
             <input className="form-control" type="text" id="assign" style={{height:50,width:70,marginTop:3}} value={this.state.number} onChange={this.onChangeNumber} textAlign={"Center"}></input>
         </div><div className="col-3"style={{/*marginLeft:-300,*/marginTop:8}}>
             <button className="btn btn-warning"style={{width:100}} onClick={this.onClickSearch} >Search</button>
         </div>

        <div className="col-2" style={{marginTop:20,marginRight:-120,marginLeft:120}}>
             <label ><h6>Invoice ID:</h6></label>
         </div>
         <div className="col-4" style={{marginTop:15,marginRight:0,marginLeft:0}}>
             <input type="text" className="form-control" value={this.state.invoice} readonly style={{width:200}} ></input >
         </div>
         
    
       </div><br/>
<div className="row">

<div className="col-8" hidden={!this.state.stillatDoc}>

<h5 className="container">Patient have not finished the consultation process!</h5>
</div>

<div className="col-8" hidden={this.state.stillatDoc}>

< div className="p-3 border bg-light rounded" >

    
<div className="row">
<div className="col-10"><h6>Consultation Charge</h6>
</div>
<div className="col" style={{fontWeight:700}}>Rs: {this.state.consult_charge}</div>


</div>
</div>
<br/>
< div className="p-3 border bg-light rounded" >
<h6>Internal Prescription</h6>
           <table className="table" id="table">
               <tbody>   
                {this.prescriptionList()}
               </tbody>
               <tfoot >
                   <tr>
                   <td>Total</td> 
                   <td></td>  
                   <td></td>                  
                   <td></td>                                    
                   <td style={{fontWeight:700}}>Rs: {this.state.prestotal}</td>
                   </tr>
               </tfoot>
               
           </table>
           </div>

<br/>
<div id="checkoutsection">
<div className="row">
        <div className="col-1" style={{marginLeft:550,marginTop:8}}><h6>Discount:</h6></div>
        <div className="col-3">
        <div class="input-group mb-3" style={{marginLeft:50}}>
         <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs.</span></div>
        <input type="text" className="form-control"style={{width:150,fontWeight:700}} value={this.state.discount} onChange={this.onChangeDiscount}></input>
        </div>
            </div>

    </div>


    <div className="row">
        <div className="col-1" style={{marginLeft:550,marginTop:8}}><h6>Total:</h6></div>
        <div className="col-3">
        <div class="input-group mb-3" style={{marginLeft:50}}>
         <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs.</span></div>
        <input type="text" className="form-control"style={{width:150,fontWeight:700}} value={this.state.total} textAlign={"left"} readonly></input>
        </div>
            </div>

    </div>

    
    <div className="row">
        <div className="col-2" style={{marginLeft:550,marginTop:8}}><h6>Pay Method:</h6></div>
        <div className="col-2" style={{marginLeft:48}}>
<select className="form-control" value={this.state.pay_method} onChange={this.onChangeMethod} >
    <option>Cash</option>
    <option>Card</option>
    </select>            </div>

    </div>
<br/>
    <div style={{marginLeft:550}}>
        <button className="btn btn-success" style={{width:327,height:40}} onClick={this.onClickProceed}>Proceed
        </button>
    </div>

</div>


</div>


<div className="col" style={{marginTop:-20,fontSize:17,marginLeft:40}}>
<br/>
Name:
<h4>{this.state.patient_name}</h4>
Gender:
<h5>{this.state.gender}</h5>

Age:
<h5>{this.state.age_now}</h5><br/>


</div>
</div>


{/*the invoice*/}<br/><br/><br/><br/>
<div id="report1" style={{width:"587px",fontSize:12}} hidden={!this.state.hide}>
<div className="container" style={{border:'solid',borderColor:'black'}}>
    <br/>
    
    <label style={{fontWeight:700,marginLeft:200,fontSize:13}}>Medica - Veyangoda</label><br/>
    <label style={{fontWeight:700,marginLeft:240,fontSize:13}}>Invoice</label><br/>
    <br/>


             <label style={{fontWeight:700}}  >Invoice ID: {this.state.invoice}</label>
             <br/>
             <label style={{fontWeight:700}}  >Invoice Date: {today.toLocaleDateString()}</label><br/><br/>

             <label style={{fontWeight:700}}  >Issued to: {this.state.patient_name}</label>

             <br/>

             <br/>


< div className="p-3 border bg-light rounded" >
<div className="row">
<div className="col-10">Consultation Charge
</div>
<div className="col" style={{fontWeight:700}}>Rs: {this.state.consult_charge}</div>


</div>
</div>
<br/>
< div className="p-3 border bg-light rounded" >
Internal Prescription
           <table className="table" id="table">
               <tbody>   
                {this.prescriptionList()}
               </tbody>
               <tfoot >
                   <tr>
                   <td>Total</td> 
                   <td></td>  
                   <td></td>                  
                   <td></td>                                    
                   <td style={{fontWeight:700}}>Rs: {this.state.prestotal}</td>
                   </tr>
               </tfoot>
               
           </table>
           </div>

<br/>
<div >
        <div  style={{marginLeft:450,marginTop:8,fontWeight:700}}>Discount: Rs. {this.state.discount}</div>
        <div  style={{marginLeft:450,marginTop:8,fontWeight:700}}>Total: Rs. {this.state.total} </div>
<br/>
    

</div>
</div>
</div>



      </div>
  }</div>
  );
  }
}

export default IssueDrugs;