import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from "react-bootstrap";

const InternalPrescription = pr=>(
    <tr>
        <td>{pr.internalP.inventoryItem_name}</td>
        <td>{pr.internalP.frequency}</td>     
        <td>{pr.internalP.dose}</td>     
        <td>{pr.internalP.duration}</td>     
    </tr>
)

const ExternalPrescription = pr=>(
    <tr>
        <td>{pr.externalP.inventoryItem_name}</td>
        <td>{pr.externalP.frequency}</td>     
        <td>{pr.externalP.dose}</td>     
        <td>{pr.externalP.duration}</td>     
    </tr>
)


export default class ViewConsultModal extends Component {
constructor(props){
    super(props); 
    this.internalPList = this.internalPList.bind(this);
    this.externalPList = this.externalPList.bind(this);


    this.state ={
        internalP:[],
        externalP:[],

        internalPsize:0,
        ongoingid:'',
        result:[],
        patinet_id:'',
        complaint:'',
        complaint_duration:'',
        pulse:0,
        blood_pressure:'',
        heart_sound:'',
        mamers:'',
        air_entry:'',
        crepitation:'false',
        ronchi:'false',
        other_exam:'',
        diagnosis:'',
        investigations:'',
        consultation_charge:'',
        consultation_date:new Date(),
        next_visit:new Date(),
    }
}



componentWillReceiveProps(){
console.log(this.props.ongoingid)

    axios.get('http://localhost:5000/consultations/getConsultationByConsultID/'+this.props.ongoingid)
    .then(response=> {
        this.setState({
            consultation_date:response.data.consultation_date.substring(0,10),
            patinet_id:response.data.patinet_id,
            complaint:response.data.complaint,
            complaint_duration:response.data.complaint_duration,
            pulse:response.data.pulse,
            blood_pressure:response.data.blood_pressure,
            heart_sound:response.data.heart_sound,
            marmers:response.data.marmers,
            air_entry:response.data.air_entry,
            crepitation:response.data.crepitation,
            ronchi:response.data.ronchi,
            other_exam:response.data.other_exam,
            diagnosis:response.data.diagnosis,
            consultation_charge:response.data.consultation_charge,
            next_visit:response.data.next_vist.substring(0,10),
        })
        console.log(response.data.next_visit);

         axios.get('http://localhost:5000/prescriptions/getPrescription/'+this.props.ongoingid)
        .then(resp=> {  
                 axios.get('http://localhost:5000/prescriptionItems/getPrescriptionItem/'+resp.data._id)
                .then(res=> {this.setState({internalP:res.data})})
            
                axios.get('http://localhost:5000/externalPrescriptions/getExternalPrescription/'+this.props.ongoingid)
                .then(resp=> {  
                         axios.get('http://localhost:5000/externalPrescriptionItems/getExternalPrescriptionItem/'+resp.data._id)
                        .then(res=> {this.setState({externalP:res.data})})})
                     .catch(function (error){console.log(error);})   
            
            
            })
             .catch(function (error){console.log(error);})

         
    })
    .catch(function (error){console.log(error);}) 
    
   
}

internalPList(){
    if(this.state.internalP.length>0){
        return this.state.internalP.map(internalP =>{
            return<InternalPrescription internalP={internalP} key={internalP._id}/>;
        })
        }          
        else {return <h7 style={{color:"black", width:800}}>No Internal Prescription Available!</h7>;}
}

externalPList(){
    if(this.state.externalP.length>0){
        return this.state.externalP.map(externalP =>{
            return<ExternalPrescription externalP={externalP} key={externalP._id}/>;
        })
        }          
        else {return <h7 style={{color:"black", width:800}}>No External Prescription Available!</h7>;}
}

   render(){
    const{crepitation}=this.state;
    const{ronchi}=this.state;
       return(

<Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        size="xl"
        centered
        
      > <Modal.Header closeButton >
      <Modal.Title>Patient History: {this.state.consultation_date}</Modal.Title>
    </Modal.Header>

<div className="container">

<div className="p-3 border bg-light">

        
<form  >
<div className="p-3 border bg-light">
<div className="row row-cols-2" >

<div className="col"> 
<label for="complaint" className="form-label">Complaint</label>
<textarea type="text" className="form-control" id="complaint"  value ={this.state.complaint} style={{height:70}} readOnly></textarea>
</div>

<div className="col"> 
<label for="duration" className="form-label"style={{marginLeft:150}}>Duration</label>
<div className="row row-cols-2" style={{marginTop:10}}>
<div className="col"> 
<input type="text" className="form-control" id="duration" value ={this.state.complaint_duration} style={{width:150, marginLeft:150}} readOnly></input>
</div>

</div>
</div>



</div>
</div>

<br/>


<div className="p-3 border bg-light">
<label className="form-label">System Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="duration" className="form-label">Pulse</label>
<div className="row row-cols-2" >
<div className="col">
<input type="text" className="form-control" id="duration" value ={this.state.pulse} readOnly></input>
</div>
<div className="col">
<label className="form-label"style={{width:10, marginTop:7}}>BPM</label>
</div>
</div>
</div>

<div className="col">
<label for="blood_pressure" className="form-label">Blood Pressure</label>
<div className="row " >
<div className="col-4">
<input type="text" className="form-control" id="blood_pressure_mm" style={{width:150}} value ={this.state.blood_pressure} readOnly></input>
</div>
<div className="col-2" style={{ marginLeft:30}} >
<label className="form-label" style={{ marginTop:7}} >mmHg</label>
</div>
</div>
</div>

<div className="col">
<label for="heart_sound" className="form-label">Heart Sound</label>
<br/>
<div className="row">
<div className="col" style={{marginRight:-40}}>
<input type="text" className="form-control"  style={{width:120}} value ={this.state.heart_sound} readOnly></input>
</div>
<div className="col" style={{marginTop:-33}}>
<label for="marmers" className="form-label">Marmers</label>
<input type="text" className="form-control" style={{width:120}} value ={this.state.marmers} readOnly></input>

</div>
</div>
     
</div>

</div>    
</div>

<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Respiratory Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="air_entry" className="form-label">Air Entry</label>
<input type="text" className="form-control" style={{width:120}} value ={this.state.air_entry} readOnly></input>

</div>

<div className="col" style={{marginLeft:0}}>
<label for="crepitation" className="form-label">Crepitation</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="crepitationRadio" id="crepitation1" value="true" checked={crepitation==="true"} readOnly/>
            <label className="form-check-label" for="crepitation1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="crepitationRadio" id="crepitation2" value="false" checked={crepitation==="false"} readOnly/>
            <label className="form-check-label" for="crepitation2">No</label>
            </div>
</div>

<div className="col" style={{marginLeft:-400}}>
<label className="form-label">Ronchi</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="ronchiRadio" id="ronchi1" value="true" checked={ronchi==="true"} readOnly />
            <label className="form-check-label" for="ronchi1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="ronchiRadio" id="ronchi2" value="false" checked={ronchi==="false"} readOnly/>
            <label className="form-check-label" for="ronchi2">No</label>
            </div>
</div>

</div>    
</div>
<br/>

<label for="other_exam" className="form-label">Other Examinations</label>
<textarea style={{height:70}} className="form-control" id="other_exam" value ={this.state.other_exam} readOnly  ></textarea>
<br/>
<label for="diagnosis" className="form-label">Diagnosis</label>
<textarea style={{height:70}} className="form-control" id="diagnosis" value ={this.state.diagnosis} readOnly ></textarea>


<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Invrestigations</label>
<textarea style={{height:40,width:500}}class="form-control" id="other_investigation" value ={this.state.investigations} readOnly ></textarea>

</div>      
<br/>
<div className="p-3 border bg-light">

<table id="table1" className="table"><h6>Internal Prescription</h6>
    <tbody>
{this.internalPList()}
    </tbody>  
</table>
<br/>

<table id="table2" className="table"><h6>External Prescription</h6>
    <tbody>
    {this.externalPList()}
    </tbody>
</table>
</div>




<br/>



<div className="row">
<div className="col-3"style={{marginRight:30}}>
<label for="consult_charge" className="form-label">Consultation Charge</label>
<input type="text" className="form-control" id="item" value ={this.state.consultation_charge} readOnly></input>
</div>

<div className="col-3" >
<label for="consult_charge" className="form-label">Follow up Visit</label>
<input type="text" className="form-control" id="item" value ={this.state.next_visit} readOnly></input>
</div>
</div>


  </form>  
     </div>
   </div>
</Modal>
       )
   } 
}