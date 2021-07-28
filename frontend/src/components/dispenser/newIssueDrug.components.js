import React, { Component, useCallback } from 'react';
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
        <td>Rs: {props.internalPrescription.price}</td>
        <td>
        <button type="button" class="btn btn-danger" style={{width: 70,marginBottom:5}} onClick={()=>
                {props.onSwitch(props.internalPrescription.inventoryItem_name,
                props.internalPrescription.prescription_id,
                props.internalPrescription.frequency,
                props.internalPrescription.dose,
                props.internalPrescription.duration,
                props.internalPrescription.price,
                )}}
                 >Switch</button>    

        </td>
        {/* <td>{props.inventoryItem.selling_price}</td> */}
    </tr>
)

const ExternalPrescription = pr=>(

    <tr>
        <td>{pr.externalPrescription.inventoryItem_name}</td>
        <td>{pr.externalPrescription.frequency}</td>
        <td>{pr.externalPrescription.dose}</td>
        <td>{pr.externalPrescription.duration}</td>
        <td>Rs: {pr.externalPrescription.price}</td>
        <td>
            
         
        {/*disabled={pr.removebutton.filter(el=>el.inventoryItem_name==pr.externalPrescription.inventoryItem_name)} */}


{(pr.removebutton.filter(el=>el.inventoryItem_name==pr.externalPrescription.inventoryItem_name).length>0)
?<button
type="button" class="btn btn-danger" disabled style={{width: 70,marginBottom:5}}  
             >Switch</button>  

: <button
type="button" class="btn btn-danger" style={{width: 70,marginBottom:5}}  onClick={()=>
             {pr.onSwitch2(pr.externalPrescription.inventoryItem_name,
                pr.externalPrescription.externalPrescription_id,
                pr.externalPrescription.frequency,
                pr.externalPrescription.dose,
                pr.externalPrescription.duration,
                pr.externalPrescription.price,
            )}}
             >Switch</button>     
}


        </td>
    </tr>
)

const Invoice = prps=>(

    <tr>
        <td>{prps.externalPrescription.inventoryItem_name}</td>
        <td>{prps.externalPrescription.frequency}</td>
        <td>{prps.externalPrescription.dose}</td>
        <td>{prps.externalPrescription.duration}</td>
    </tr>
)

class IssueDrugs extends Component {
  constructor(props) {
    super(props);
    
    this.prescriptionList =this.prescriptionList.bind(this);
    this.onChangeNumber =this.onChangeNumber.bind(this);
    this.onClickSearch =this.onClickSearch.bind(this);
    this.externalPrescriptionList =this.externalPrescriptionList.bind(this);
    this.onSwitch =this.onSwitch.bind(this);
    this.onSwitch2 =this.onSwitch2.bind(this);
    this.onChangeTotal =this.onChangeTotal.bind(this);
    this.confirmInternal =this.confirmInternal.bind(this);
    this.confirmExternal =this.confirmExternal.bind(this);
    this.finalConfirm =this.finalConfirm.bind(this);


    this.generateReport =this.generateReport.bind(this);
    this.invoiceList =this.invoiceList.bind(this);
    this.createPDF =this.createPDF.bind(this);



    this.state = {
        initialExPsize:0,
        initialInPsize:0,
        prescription_id:'',
        externalPrescription_id:'',
        number:0,
        stockOrder:[],
        assigned_number:0,
        prescriptionItems:[],
        externalPrescriptionItems:[],
        patient:[],
        total:0,
        consult_charge:0,
        age_now:0,
        consultation:[],
        patient_name:'',
        gender:'',
        stillatDoc:'',
        allnumbers:[],
        currentIndex:0,
        removebutton:[],
        confirmunits:'',
        passingdoctor:[],
        hide:'',
        noone:''


    };
  }
  componentDidMount(){
    axios.get('http://localhost:5000/patients/getallNumbers')
    .then(res=>{
console.log(res.data)  
if(res.data.length>0)  {              
 this.setState({allnumbers:res.data,
     number:res.data[0].assigned_number,
    currentIndex:0})

        this.onClickSearch();
     }
     else{this.setState({noone:true})}
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


generateReport(){
            var doc = new jsPDF('portrait','pt','a4','false');
            doc.setFontSize(5);
            doc.html(document.querySelector("#report1"),{
            callback:function(pdf){
                 pdf.save("in.pdf");
            }
        })     
}

confirmExternal(){
    if(this.state.externalPrescriptionItems.length==0){

    }  
    else{
        if(this.state.initialExPsize==0){
            const ex={
                consultation_id:this.state.consultation._id
            }
            axios.post('http://localhost:5000/externalPrescriptions/addExternalPrescription',ex)
            .then(response1 => {
                for(let i=0;i<this.state.externalPrescriptionItems.length;i++){
                    const ExPres={
                        externalPrescription_id:response1.data,
                        inventoryItem_name:this.state.externalPrescriptionItems[i].inventoryItem_name,
                        frequency:this.state.externalPrescriptionItems[i].frequency,   
                        dose:this.state.externalPrescriptionItems[i].dose,
                        duration:this.state.externalPrescriptionItems[i].duration,
                        price:this.state.externalPrescriptionItems[i].price
                      }
                      axios.post('http://localhost:5000/externalPrescriptionItems/addExternalPrescriptionItems', ExPres)
                      .then(res4=> console.log(res4.data))
                }
            })
        }
        else{
            axios.delete('http://localhost:5000/externalPrescriptionItems/deleteExternalItems/' +this.state.externalPrescription_id)
        .then(response2 => {
            for(let i=0;i<this.state.externalPrescriptionItems.length;i++){
                const ExPres={
                    externalPrescription_id:this.state.externalPrescription_id,
                    inventoryItem_name:this.state.externalPrescriptionItems[i].inventoryItem_name,
                    frequency:this.state.externalPrescriptionItems[i].frequency,   
                    dose:this.state.externalPrescriptionItems[i].dose,
                    duration:this.state.externalPrescriptionItems[i].duration,
                    price:this.state.externalPrescriptionItems[i].price
                  }
                  axios.post('http://localhost:5000/externalPrescriptionItems/addExternalPrescriptionItems', ExPres)
                  .then(res4=> console.log(res4.data))
            }
        })
            
        }
    }
}

 confirmInternal(){
if(this.state.initialInPsize==0){

}
else{
    axios.delete('http://localhost:5000/prescriptionItems/deleteItems/' +this.state.prescription_id)
    .then(res2 => {
    if(this.state.prescriptionItems.length>0){
        for(let i=0;i<this.state.prescriptionItems.length;i++){
            const InPres={
                prescription_id:this.state.prescription_id,
                inventoryItem_name:this.state.prescriptionItems[i].inventoryItem_name,
                frequency:this.state.prescriptionItems[i].frequency,   
                dose:this.state.prescriptionItems[i].dose,
                duration:this.state.prescriptionItems[i].duration,
                price:this.state.prescriptionItems[i].price
              }
              axios.post('http://localhost:5000/prescriptionItems/addPrescriptionItems', InPres)
              .then(res4=> console.log(res4.data))


              axios.get('http://localhost:5000/inventoryItems/strength/'+ this.state.prescriptionItems[i].inventoryItem_name)
                    .then(ressult1=> {
                        
                        var freq=0;
                        if(this.state.prescriptionItems[i].frequency=="EOD"){freq=0.5;}
                        if(this.state.prescriptionItems[i].frequency=="Manne"||this.state.prescriptionItems[i].frequency=="Daily"||this.state.prescriptionItems[i].frequency=="Noctay"){freq=1;}
                        if(this.state.prescriptionItems[i].frequency=="BD"){freq=2;}
                        if(this.state.prescriptionItems[i].frequency=="TDS"){freq=3;}
                        if(this.state.prescriptionItems[i].frequency=="6 Hourly"){freq=4;}

                        this.setState({
                            confirmunits:Number(freq)*Number(this.state.prescriptionItems[i].dose)*Number(parseInt(this.state.prescriptionItems[i].duration))/Number(ressult1.data)
                        })
                        var conun=this.state.confirmunits;
                        
                        axios.get('http://localhost:5000/stocks/orderStocks/'+ this.state.prescriptionItems[i].inventoryItem_name)
                        .then(ressult2=> {
                            this.setState({
                                stockOrder:ressult2.data
                            })

                        for(let j=0;j<this.state.stockOrder.length;j++){
                                if(Number(conun)==0){
                                    console.log("break");
                                    break;
                                } 
                                else if(this.state.stockOrder[j].units==0){
                                    console.log("ran");
                                }
                                else if(conun>this.state.stockOrder[j].units){
                                    conun =Number(conun)-Number(this.state.stockOrder[j].units);
                                    axios.post('http://localhost:5000/stocks/reduce/'+this.state.stockOrder[j]._id)
                                    .then(res4=>{
                                    });
                                }
                                else{
                                    const red={
                                        units:conun
                                    }
                                    var thisItem=this.state.prescriptionItems[i].inventoryItem_name

                                    axios.post('http://localhost:5000/stocks/reduceByNum/'+this.state.stockOrder[j]._id,red)
                                    .then(res3=>{
                                        console.log("final:", this.state.prescriptionItems);

                                        const item={
                                            item_name:thisItem
                                        }

                                        axios.post('http://localhost:5000/stocks/getstockunits', item)
                                        .then(res4=> {
                                            axios.post('http://localhost:5000/inventoryItems/getItemByVal/'+ thisItem)
                                        .then(res5=> {
                                                if(res4.data<res5.data.reorder_level){
                                                    const not={
                                                        type:"Low Stock",
                                                        not_item:thisItem,
                                                        not_value:res4.data,
                                                    }
                                                    axios.post('http://localhost:5000/notifications/addNot', not)
                                                    .then(res4=> {})

                                                }
                                        })
                                            
                                        });

                                        this.setState({
                                            confirmunits:0
                                        })
                                    })
                                    conun=0;
                                }
                            }
                            
                        })
                    });
        }
    }
    else{
        axios.delete('http://localhost:5000/prescriptions/deletePrescription/' +this.state.prescription_id)
        .then(res3 => {console.log(res3.data)})
    }
})


}



}

finalConfirm(){
    this.confirmInternal();
    this.confirmExternal();
this.setState({
    hide:true
},()=>{
    this.generateReport()
})
// this.createPDF()

    swal("Issue of drug completed!", "press OK to move to next patient", "success",{
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
                    currentIndex:Number(this.state.currentIndex)+1
                    },()=>{this.onClickSearch()})
            }else{
                this.setState({noone:true})
            }
            
    
            break;

        }
      });
    
}

onSwitch2(itemname,id,freq,dose,dur,price){
                    this.setState({
                        externalPrescriptionItems:this.state.externalPrescriptionItems.filter(el=>el.inventoryItem_name!==itemname)
                    })
                    this.setState({
                        prescriptionItems: [...this.state.prescriptionItems, ...[
                            {prescription_id:id,
                            inventoryItem_name:itemname, 
                             frequency:freq,
                             dose:dose,
                             duration:dur,
                             price:price
                            }] 
                           ] 
                    },()=>{this.onChangeTotal()})
    }
     
    onSwitch(itemname,id,freq,dose,dur,price){
    this.setState({
        prescriptionItems:this.state.prescriptionItems.filter(el=>el.inventoryItem_name!==itemname),
        externalPrescriptionItems: [...this.state.externalPrescriptionItems, ...[
            {externalPrescription_id:id,
            inventoryItem_name:itemname, 
             frequency:freq,
             dose:dose,
             duration:dur,
             price:price
            }] 
           ] 
    },()=>{
        this.onChangeTotal();
        console.log("internal:",this.state.prescriptionItems)
          console.log("External:",this.state.externalPrescriptionItems)
    }
    )
    
    }
    

onChangeNumber(e){
    this.setState({ 
        number: e.target.value 
    });
}

onChangeTotal() {
if(this.state.prescriptionItems.length>0){
    var x=0;
    for(let i=0;i<this.state.prescriptionItems.length;i++){
            x=x+Number(this.state.prescriptionItems[i].price)
    }
    this.setState({
        total:x+Number(this.state.consult_charge)
    })
}
else{this.setState({
    total:Number(this.state.consult_charge)
})}
} 
  
onClickSearch(){
    this.setState({
        prescriptionItems:[],
        externalPrescriptionItems:[],
        removebutton:[]
    })
    const num={
        assigned_number:this.state.number
    }

    axios.post('http://localhost:5000/patients/getPatiendID',num)
    .then(res1=>{
        this.setState({patient:res1.data,
        patient_name:res1.data.patient_name,
        gender:res1.data.gender
        },()=>{
            var today = new Date();
            var birthDate = new Date(this.state.patient.date_of_birth); 
            this.setState({age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())})
        }
            )
            axios.post('http://localhost:5000/consultations/treatmentConsultation/'+res1.data._id)
            .then(resp1 => {   

                axios.get('http://localhost:5000/staffs/getDocByName/'+resp1.data.consult_doctor.substring(3))
                .then(reply=> { 
                    this.setState({
                            passingdoctor:reply.data
                        })
                    })

                axios.get('http://localhost:5000/checkouts/getcheck/'+resp1.data._id)
                    .then(resp2 => { 
                        if(resp2.data==null){
                            this.setState({stillatDoc:"" }) 
                        }
                        else{
                            this.setState({stillatDoc:"yes"}) 
                        }
                     }).catch(err=>{console.log(err)})

                    axios.get('http://localhost:5000/externalPrescriptions/getExternalPrescription/'+resp1.data._id)
                    .then(response2 => {
                        this.setState({
                            externalPrescription_id:response2.data._id
                        })
                            axios.get('http://localhost:5000/externalPrescriptionItems/getExternalPrescriptionItem/'+response2.data._id)
                            .then(reply2 => {
                                this.setState({
                                externalPrescriptionItems:reply2.data,
                                removebutton:reply2.data,
                                initialExPsize:reply2.data.length,
                                })   
                                console.log(reply2.data)
                        }).catch(err =>{console.log('Error');})
                    }).catch(err =>{console.log('Error');})
            }).catch(err =>{console.log('Error');})
    }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        this.setState({
            patient:[],
            patient_name:'',
            gender:'',
            age_now:'',
            externalPrescriptionItems:[]
        })
    })
    
        
    axios.post('http://localhost:5000/patients/getPatiendID',num)
    .then(res=>{
            axios.post('http://localhost:5000/consultations/treatmentConsultation/'+res.data._id)
            .then(resp => {
                this.setState({
                    consultation:resp.data,
                    consult_charge:resp.data.consultation_charge
                }) 
                console.log(this.state.consultation);
                 axios.get('http://localhost:5000/prescriptions/getPrescription/'+resp.data._id)
                    .then(response => {
                        this.setState({
                            prescription_id:response.data._id
                        })
                        axios.get('http://localhost:5000/prescriptionItems/getPrescriptionItem/'+response.data._id)
                        .then(reply => {
                            this.setState({
                                prescriptionItems:reply.data,
                                initialInPsize:reply.data.length
                        })        
                        this.onChangeTotal();

                        }).catch(err =>{console.log('Error');})
                    }).catch(err =>{console.log('Error');})
            }).catch(err =>{console.log('Error');})
    }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        this.setState({
            consultation:[],
            consult_charge:0,
            prescriptionItems:[],
            total:0
        })
    })


}

  

prescriptionList(){
    if(this.state.prescriptionItems.length>0){
    return this.state.prescriptionItems.map(currentItem =>{
        return<InternalPrescription internalPrescription={currentItem} onChangeTotal={this.onChangeTotal} onSwitch={this.onSwitch} key={currentItem._id}/>;
    })
    }
    else{return ("No Items Available");}
}


externalPrescriptionList(){
    if(this.state.externalPrescriptionItems.length>0){
    return this.state.externalPrescriptionItems.map(itemnow =>{
        return<ExternalPrescription externalPrescription={itemnow} removebutton={this.state.removebutton}  checkLevel={this.checkLevel}
        onSwitch2={this.onSwitch2} key={itemnow._id}/>;
    })
    }
    else{return ("No Items Available");}
}

invoiceList(){
    if(this.state.externalPrescriptionItems.length>0){
    return this.state.externalPrescriptionItems.map(itemnow =>{
        return<Invoice externalPrescription={itemnow}/>;
    })
    }
    else{return ("No Items Available");}
}


  render() {

    return (
        <div>
        {(this.state.noone==true)
        ?<h6>No patients has been assigned a number!</h6>
        :<div >
<div className="row ">
         <div className="col-1"style={{marginRight:-30,marginLeft:30}}>
             <input className="form-control" type="text" id="assign" style={{height:50,width:70,marginTop:3}} value={this.state.number} onChange={this.onChangeNumber} textAlign={"Center"}></input>
         </div><div className="col-2"style={{/*marginLeft:-300,*/marginTop:8}}>
             <button className="btn btn-warning"style={{width:100}} onClick={this.onClickSearch} >Search</button>
         </div>
         {(this.state.stillatDoc=="yes")
         ?<></>
         :<>
         <div className="col-2" style={{marginTop:15,marginRight:-60,marginLeft:60}}>
             <label ><h5>Total Amount:</h5></label>
         </div>
     
         <div className="col-2" style={{marginTop:8,marginRight:100}}>
         <div class="input-group mb-3" >
         <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs.</span></div>
     
             <input type="text" className="form-control"style={{width:150,fontWeight:700}} value={this.state.total} readonly></input>
     </div>
         </div>
     
         <div className="col-3" style={{marginTop:8}}>
             <button className="btn btn-success"style={{width:200}} onClick={this.finalConfirm}>Confirm</button>
         </div></>

         }


         </div>

       
       
       <br/><br/>
<div className="row" >
<div className="col-8" hidden={!this.state.stillatDoc}>

<h5 className="container">Patient have not finished the consultation process!</h5>
</div>

<div className="col-8" hidden={this.state.stillatDoc}>
< div className="p-3 border bg-light" >
<h5>Internal Prescription</h5>
           <table className="table" id="table">
               <tbody>   
                {this.prescriptionList()}
               </tbody>
           </table>
           </div>

<br/>

<div className="p-3 border bg-light" >
<h5>External Prescription</h5>
           <table className="table" id="table2">
               <tbody>
               {this.externalPrescriptionList()}

               </tbody>
           </table>
           </div>


<br/><br/>
<br/>
<br/>

<div id="report1" style={{width:"587px",fontSize:12}} hidden={!this.state.hide}><br/>
    <div className="container" style={{border:'solid',borderColor:'black'}}><br/>
    <label style={{fontWeight:700,marginLeft:200,fontSize:13}}>Medica - Veyangoda</label><br/>
    <label style={{fontWeight:700,marginLeft:240,fontSize:13}}>Precscription</label><br/>
    <br/>
    <label style={{fontWeight:700}}  >Issued to: {this.state.patient_name}</label>
<br/>
<br/>
<table className="table" id="table2">
               <tbody>
               {this.invoiceList()}
               </tbody>
           </table>
           <div style={{marginLeft:350}}>
           Dr. {this.state.passingdoctor.staff_name}<br/>
{this.state.passingdoctor.title}<br/>
{this.state.passingdoctor.speciality}<br/>
Registration No: {this.state.passingdoctor.reg_no}<br/>
           </div>

<br/>
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
      </div>
          }</div>
            );
  }
}

export default IssueDrugs;