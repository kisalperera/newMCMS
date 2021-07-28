import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddConsultModal from "./addConsultation.components";
import ViewConsultModal from "./showConsultation.components";
import Allergy from "./allergy.components";
import Reports from "./reports.components";
import Con from "./consultationModal.components";


import swal from '@sweetalert/with-react';

const ConsultationCard = (props) => {
  const  consultation  = props.consultation;   


    return(
      <div className="card" name="consultcard" style={{width:800,height:60,marginTop:-20,paddingLeft:0}} 
      onClick={()=>{  /*localStorage.setItem('thisConsultation',consultation._id);*/
        props.viewModal(consultation._id)}}>
          <div className ="card-body" style={{color:'black',marginTop:3}} >
              <div className="row">
                <div className="col-3">
                    <h6 class="card-text">{consultation.consultation_date.substring(0,10)}</h6>
                </div>
                <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                    |
                </div><div className="col-4">
                    <h6 class="card-text">{consultation.diagnosis }</h6>
                </div>
                <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                    |
                </div>
                
                <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                    <h6 class="card-text">{consultation.consult_doctor }</h6>
                </div>

            </div>
                           
          </div>
      </div>
  )
 
};

export default class ShowConsultationList extends Component {
  constructor(props) {
    super(props);

    this.onClickSearch =this.onClickSearch.bind(this);
    this.onChangeNumber =this.onChangeNumber.bind(this);
    this.consultModal =this.consultModal.bind(this);
    this.viewModal =this.viewModal.bind(this);
    this.consultList =this.consultList.bind(this);
    this.allergyModal =this.allergyModal.bind(this);
    this.reportModal =this.reportModal.bind(this);
    this.first =this.first.bind(this);
    this.second =this.second.bind(this);



    this.state = {
      here:"test",
      viewingconsult:'',
      patientName:'',
      gender:"",
      age:'',
      marital:'',
      occupation:'',
      leastpatient:[],
      val:'',
      consultations: [],
      patient_id:'',
      assigned_number:0,
      patient:[],
      age_now:'0',
      deps:[],
      addModalShow:false,
      viewModals:false,
      allergyShow:false,
      ongoingid:'',
      reportmodal:'',
      passingArray:[],
      docassigned:'A',
      value:'',
      externalP:[],
      internalP:[],
      passingdoctor:[]
    };
  }

reportModal(){
    this.setState({reportmodal:true})
}

consultModal(){
    this.setState({addModalShow:true})
}

first(id){
  
  axios.get('http://localhost:5000/consultations/getConsultationByConsultID/'+id)
  .then(response=> {

        axios.get('http://localhost:5000/prescriptions/getPrescription/'+id)
        .then(resp=> {  
          if(resp.data!=null){
             axios.get('http://localhost:5000/prescriptionItems/getPrescriptionItem/'+resp.data._id)
            .then(res=> {this.setState({internalP:res.data})})
          }
        })


        axios.get('http://localhost:5000/externalPrescriptions/getExternalPrescription/'+id)
        .then(resp2=> {  
          if(resp2.data!=null){
        axios.get('http://localhost:5000/externalPrescriptionItems/getExternalPrescriptionItem/'+resp2.data._id)
        .then(res=> {this.setState({externalP:res.data})})
          }
      })       

      console.log(response.data.consult_doctor.substring(3))
      axios.get('http://localhost:5000/staffs/getDocByName/'+response.data.consult_doctor.substring(3))
      .then(reply=> { 
          this.setState({
            passingdoctor:reply.data
          })
       })


      this.setState({passingArray:response.data})  
  })


  this.setState({ongoingid:id})
  console.log("first")
}
second(){
  
  this.setState({viewModals:true})

    console.log("second")

}

async viewModal(id){

  await this.first(id);
  this.second();

}

allergyModal(){
  this.setState({allergyShow:true});
}

onChangeNumber(e){
  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({val: amount,
    value:this.state.docassigned+amount
  });  
    
}
  
  onClickSearch(){
    const num={
      assigned_number:this.state.value
  }
  console.log(num.assigned_number);
  // if(Number(this.state.val)>0){
      
  axios.post('http://localhost:5000/patients/getPatiendID',num)
  .then(res=>{
         this.setState({ patient: res.data })
          let thisPatient=res.data._id;
          localStorage.setItem("thisPatient",thisPatient);

          axios.get('http://localhost:5000/consultations/getConsultationByID/'+localStorage.getItem("thisPatient"))
          .then(resp => {
            this.setState({
              consultations: resp.data
            })

            var today = new Date();
            var birthDate = new Date(this.state.patient.date_of_birth); 
            this.setState({age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())})

            this.setState({
              patientName:this.state.patient.patient_name,
              gender:this.state.patient.gender,
              age:this.state.age_now,
              marital:this.state.patient.marital_status,
              occupation:this.state.patient.occupation
            })
          })
          .catch(err =>{
            console.log('Error from ShowConsultationList');
          })

  }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        localStorage.setItem("thisPatient",'No');

        this.setState({
          patient:[],
          patientName:'',
          gender:'',
          age:'',
          marital:'',
          occupation:'',
          consultations:[],
          thisdoctor:[]
        })
      })


  }
componentDidMount(){
  axios.get('http://localhost:5000/staffs/getDocByID/'+localStorage.getItem('staff_id'))
  .then(res1=>{
      this.setState({
        thisdoctor:res1.data,
        docassigned:res1.data.assiged_number
      })

      this.setState({
        val:1,
        value:res1.data.assiged_number+1
      },()=>{this.onClickSearch()})
console.log(this.state.thisdoctor)
  })

  

 


}

consultList(){

  if(this.state.consultations.length>0){
    return this.state.consultations.map(consultation =>{
        return<ConsultationCard consultation={consultation} viewModalClose={this.viewModalClose}
        viewModals={this.state.viewModals} viewModal={this.viewModal} key={consultation._id}/>;
    })
    }
    else if(this.state.patientName!=''){
      return <h6 style={{color:"black", marginTop:20,width:800}}>No Patient History Available!</h6>;
    }

    else {
      return <h6 style={{color:"black", marginTop:20,width:800}}>No Patient Available!</h6>;
    }
   
  }
render() {
    let addModalClose=()=>{
      this.setState({addModalShow:false})
      this.onClickSearch();
      

    };
    let viewModalClose=()=>{
  localStorage.setItem('thisConsultation',0);

      this.setState({viewModals:false}) 
   };

   let allergyModalClose=()=>{
    this.setState({allergyShow:false}) 
  };

  let reportModalClose=()=>{
    this.setState({reportmodal:false}) 
  };
 

    return (
<div>
        <div className="row ">
         <div className="col-1"style={{marginRight:30,marginLeft:30}}>
         <div className="row" >
         <div className="col-1" style={{marginRight:10}} >
         <span style={{height:50,width:40,marginTop:3}} class="input-group-text" id="basic-addon1">{this.state.docassigned}</span>
         </div>
         <div className="col-1" >
         <input className="form-control" type="text" id="assign" style={{height:50,width:50,marginTop:3}} value={this.state.val} onChange={this.onChangeNumber} textAlign={"Center"}></input>

         </div>

         </div>

         </div><div className="col-4"style={{/*marginLeft:-300,*/marginTop:8}}>
             <button className="btn btn-warning"style={{width:100}} onClick={this.onClickSearch} >Search</button>
         </div>
         <div hidden={!this.state.patientName} className="col"style={{/*marginLeft:700,*/marginTop:8}}><button type="button" className="btn btn-success"  style={{width:150}}
        onClick={()=>{this.reportModal()}}>Reports</button>
        <Reports
         show={this.state.reportmodal}
         onHide={reportModalClose}
         
         />
        </div> 

         <div hidden={!this.state.patientName} className="col"style={{/*marginLeft:700,*/marginTop:8}}><button type="button" className="btn btn-danger"  
        onClick={()=>{this.allergyModal()}}>Allergic History</button>
        <Allergy
         show={this.state.allergyShow}
         onHide={allergyModalClose}
         
         />
    </div> 

        <div hidden={!this.state.patientName} className="col"style={{/*marginLeft:700,*/marginTop:8}}><button type="button" className="btn btn-primary"  
        onClick={()=>{this.consultModal()}}>Add Consultation</button>
        <AddConsultModal
         show={this.state.addModalShow}
         onHide={addModalClose}

         />
        <Con
          show={this.state.viewModals}
          data={this.state.passingArray}
          doctor={this.state.passingdoctor}
          externalP={this.state.externalP}
          internalP={this.state.internalP}
          onHide={viewModalClose}
          />
{/*          
         <ViewConsultModal
          
         show={this.state.viewModals}
        //  ongoingid={this.state.ongoingid}
         onHide={viewModalClose}
         /> */}
    </div>

       </div>

       {(localStorage.getItem("thisPatient")=="No")
       ?<div style={{marginLeft:50}}><br/><br/><h5>No patient available!</h5></div>
       :<div className="row  p-3 border bg-light" style={{marginTop:10}}>
<div className="col" style={{marginTop:30}}>
<div className="ShowConsultationList">
        <div className="container">

          <div className="listConsultation">
          
                {this.consultList()}
                
          </div>
        </div>
      </div>
</div>


<div className="col" style={{marginTop:20,fontSize:17,marginLeft:30}}>
<br/>

<h4 >{this.state.patientName}</h4><br/>
Gender:
<h5> {this.state.gender}</h5>
Age:
<h5 >{this.state.age}</h5>
Marital Status:
<h5 >{this.state.marital}</h5>
Occupation:
<h5 >{this.state.occupation}</h5>



</div>


</div>}
      

      </div>
    );
  }
}

