import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Con from "./consultationModal.components";
import ViewConsultModal from "./showConsultation.components";
import Allergy from "./allergy.components";
import Reports from "./reports.components";

const ConsultationCard = (props) => {
  const  consultation  = props.consultation;   

  return(
    <div className="card" name="consultcard" style={{width:800,height:60,marginTop:-20,paddingLeft:0}} onClick={()=>{  /*localStorage.setItem('thisConsultation',consultation._id);*/
    props.viewModal(consultation._id)}}>
        <div className ="card-body" style={{color:'black',marginTop:3}} >
            <div className="row">
              <div className="col-2">
                  <h6 class="card-text">{consultation.consultation_date.substring(0,10)}</h6>
              </div>
              <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                  |
              </div><div className="col-2">
                  <h6 class="card-text">{consultation.diagnosis }</h6>
              </div>
              <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                  |
              </div>
              <div className="col-2">
                  <h6 class="card-text">{consultation.other_exam }</h6>
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

class ShowConsultationList extends Component {
  constructor(props) {
    super(props);
    // this.viewModal =this.viewModal.bind(this);
    this.consultModal =this.consultModal.bind(this);
    this.allergyModal =this.allergyModal.bind(this);
    this.reportModal =this.reportModal.bind(this);
    this.viewModal =this.viewModal.bind(this);
    this.first =this.first.bind(this);
    this.second =this.second.bind(this);



    this.state = {
      consultations: [],
      val:'',
      addModalShow:false,
      viewModals:false,
      patient:[],
      age_now:0,
      reportmodal:false,
      allergyShow:false,
      passingArray:[],
      passingdoctor:[],
      externalP:[],
      internalP:[],
      data:[],

    };
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

  consultModal(){
    this.setState({addModalShow:true})
}

// viewModal(id){
//   localStorage.setItem('thisConsultation',id);
//   this.setState({viewModal:true})
// }

allergyModal(){
  this.setState({allergyShow:true});
}
reportModal(){
  this.setState({reportmodal:true})
}

componentDidMount() {

  localStorage.setItem("thisPatient",this.props.match.params.id)

  axios.get('http://localhost:5000/patients/getPatientByID/'+this.props.match.params.id)
  .then(response=> {
    this.setState({
        patient:response.data
    })
    var today = new Date();
    var birthDate = new Date(this.state.patient.date_of_birth); 
    this.setState({
      age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())
})

  })
  .catch(err=>{
    console.log(err);
  })



    axios
      .get('http://localhost:5000/consultations/getConsultationByID/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          consultations: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowConsultationList');
      })

      let patient=this.props.match.params.id;
  localStorage.setItem('Patient',patient);
  };


  render() {

    let allergyModalClose=()=>{
      this.setState({allergyShow:false}) 
    };
  
    let reportModalClose=()=>{
      this.setState({reportmodal:false}) 
    };

    let addModalClose=()=>{
      this.setState({addModalShow:false})
      // this.props.reset();
      window.location.reload();
      

    };
    let viewModalClose=()=>{
      localStorage.setItem('thisConsultation',0);
    
          this.setState({viewModals:false}) 
       };


    const consultations = this.state.consultations;
    console.log("PrintBook: " + consultations);
    let consultationList;

    if(!consultations) {
      consultationList = "there is no staff record!";
    } else {
      consultationList = consultations.map((consultation, k) =>
        <ConsultationCard consultation={consultation} viewModal={this.viewModal} key={k} />
      );
    }

    return (
<div>
        <div className="row -md-6">
         <div className="col-8"> </div>

         <div  className="col-2"style={{/*marginLeft:700,*/}}><button type="button" className="btn btn-success"  style={{width:150}}
        onClick={()=>{this.reportModal()}}>Reports</button>
        <Reports
         show={this.state.reportmodal}
         onHide={reportModalClose}
         />
        </div> 

         <div  className="col-2"style={{/*marginLeft:700,*/}}><button type="button" className="btn btn-danger"  
        onClick={()=>{this.allergyModal()}}>Allergic History</button>
        <Allergy
         show={this.state.allergyShow}
         onHide={allergyModalClose}
         />

        <Con
          show={this.state.viewModals}
          data={this.state.passingArray}
          doctor={this.state.passingdoctor}
          externalP={this.state.externalP}
          internalP={this.state.internalP}
          onHide={viewModalClose}
          />    

    </div> 

        <div className="col">
         <ViewConsultModal
         show={this.state.viewModal}
         onHide={viewModalClose}
         />
    </div>

       </div>

       <div className="row  p-3 border bg-light" style={{marginTop:10}}>
<div className="col" style={{marginTop:30}}>
<div className="ShowConsultationList">
        <div className="container">

          <div className="listConsultation">
                {consultationList}
          </div>
        </div>
      </div>
</div>


<div className="col" style={{marginTop:20,fontSize:17,marginLeft:30}}>
<br/>

<h4>{this.state.patient.patient_name}</h4><br/>
Gender:
<h5>{this.state.patient.gender}</h5>
Age:
<h5>{this.state.age_now}</h5>
Marital Status:
<h5>{this.state.patient.marital_status}</h5>
Occupation:
<h5>{this.state.patient.occupation}</h5>



</div>


</div>

      </div>
    );
  }
}

export default ShowConsultationList;