import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { Modal, Button } from "react-bootstrap";

export default class editPatient extends Component {
constructor(props){
    super(props);

    this.onChangePatientID =this.onChangePatientID.bind(this);
    this.onChangePatientName =this.onChangePatientName.bind(this);
    this.onChangeDateOfBirth =this.onChangeDateOfBirth.bind(this);
    this.onChangeGender =this.onChangeGender.bind(this);
    this.onChangePatientAddress =this.onChangePatientAddress.bind(this);
    this.onChangePatientPhoneNo =this.onChangePatientPhoneNo.bind(this);
    this.onChangeOccupation =this.onChangeOccupation.bind(this);
    this.onChangeMaritalStatus =this.onChangeMaritalStatus.bind(this);
    this.onChangeChildrenNo =this.onChangeChildrenNo.bind(this);
    this.onChangeAlcohol =this.onChangeAlcohol.bind(this);
    this.onChangeSmoking =this.onChangeSmoking.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state ={
        patient_id:0,
        patient_name:'',
        date_of_birth:new Date(),
        gender:'',
        patient_address:'',
        patient_phone:'',
        occupation:'',
        marital_status:'',
        children_no:0,
        smoking: '',
        alcohol: '',
     
}
}
// componentDidMount(){
//     axios.get('http://localhost:5000/patients/getPatientByID/'+this.props.id)
//     .then(response=> {
//         this.setState({

//             patient_id:response.data.patient_id,
//             patient_name:response.data.patient_name,
//             date_of_birth:new Date(response.data.date_of_birth),
//             gender:response.data.gender,
//             patient_address:response.data.patient_address,
//             patient_phone:response.data.patient_phone,
//             occupation:response.data.occupation,
//             marital_status:response.data.marital_status,
//             children_no:response.data.children_no,
//             smoking:response.data.smoking,
//             alcohol:response.data.alcohol,
//             //assigned_number:100

//         })
//     })
//     .catch(function (error){
//         console.log(error);
//     })
    
// }

onChangePatientID(e){
    this.setState({
        patient_id :e.target.value
    });
}

onChangePatientName(e){
    this.setState({
        patient_name :e.target.value
    });
}

onChangeDateOfBirth(date){
    this.setState({
        date_of_birth :date
    });
}



onChangeGender(e){
    this.setState({
        gender :e.target.value
    });
}

onChangePatientAddress(e){
    this.setState({
        patient_address :e.target.value
    });
}

onChangePatientPhoneNo(e){
    this.setState({
        patient_phone :e.target.value
    });
}

onChangeOccupation(e){
    this.setState({
        occupation :e.target.value
    });
}

onChangeMaritalStatus(e){
    this.setState({
        marital_status :e.target.value
    });
}

onChangeChildrenNo(e){
    this.setState({
        children_no :e.target.value
    });
}

onChangeSmoking = e => {
    this.setState({
      smoking: e.target.value
    })
}

onChangeAlcohol =e => {
    this.setState({
      alcohol: e.target.value
    })
}

onSubmit(e){
    e.preventDefault();

    const patient ={
        patient_id:this.state.patient_id,
        patient_name:this.state.patient_name,
        date_of_birth:this.state.date_of_birth,
        gender:this.state.gender,
        patient_address:this.state.patient_address,
        patient_phone:this.state.patient_phone,
        occupation:this.state.occupation,
        marital_status:this.state.marital_status,
        children_no:this.state.children_no,
        smoking:this.state.smoking,
        alcohol:this.state.alcohol
    }

    axios.post('http://localhost:5000/patients/updatePatient'+this.props.id, patient)
        .then(res=> console.log(res.data));    
   console.log("updated")    
   window.location='/patientRc'
}

onCancel(){
    window.location='/patients'
    }

   render(){
    const{smoking}=this.state;
    const{alcohol}=this.state;
       return(

       
        <div className="container">
        
        
        <div className="p-3 border bg-light">
        
                
        <form onSubmit={this.onSubmit} >
                <div className="mb-3">
                    <label for="patient_id" className="form-label">Patient ID</label>
                    <input type="text" className="form-control" id="patient_id" value ={this.state.patient_id} onChange={this.onChangePatientID}></input>
                    </div>
        
                    <div className="mb-3">
                    <label for="patient_name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="patient_name" value ={this.state.patient_name} onChange={this.onChangePatientName}></input>
                    </div>
        
                    <div className="row row-cols-3">
                    <div className="col">
                    <div className="mb-3">
                    <label for="date_of_birth" className="form-label">Date Of Birth</label>
                    {/* <input type="text" className="form-control" id="date_of_birth" value ={this.state.date_of_birth} onChange={this.onChangeDateOfBirth}></input> */}
                    <br/>
                    <DatePicker
                    selected={this.state.date_of_birth}
                    value={this.state.date_of_birth}
                    onChange={this.onChangeDateOfBirth}
                    className="form-control"
                    id="date_of_birth"
                    />           
                    </div>
                    </div>  
        
                    <div className="col">
                    <div className="mb-3">
                    <label for="gender" className="form-label">Gender</label>
                    <select className="form-control" aria-label=".form-select-lg example" id="gender" value ={this.state.gender} onChange={this.onChangeGender}>
                    <option selected>Select Gender</option>
                    <option >Male</option>
                    <option >Female</option>
                    </select>
                    </div>
                    </div>
        
                    <div className="col">
                    <div className="mb-3">
                    <label for="phone_no" className="form-label">Phone No</label>
                    <input type="text" className="form-control" id="phone_no" value ={this.state.patient_phone} onChange={this.onChangePatientPhoneNo}></input>
                    </div>
                    </div>
        
                    </div>
        
        
                    <div className="mb-3">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value ={this.state.patient_address} onChange={this.onChangePatientAddress}  style={{height:70}}></input>
                    </div>         
        
                    <div className="row row-cols-2">
        
                    <div className="col">
                    <div className="mb-3">
                    <label for="occupation" className="form-label">Occupation</label>
                    <input type="text" className="form-control" id="occupation" value ={this.state.occupation} onChange={this.onChangeOccupation}></input>
                    </div>
                    </div>
        
                    <div className="col">
                    <div className="mb-3">
                    <label for="marital_status" className="form-label">Marital Status</label>
                    <select className="form-control" aria-label=".form-select-lg example" id="marital_status" value ={this.state.marital_status} onChange={this.onChangeMaritalStatus}>
                    <option selected>Select Status</option>
                    <option >Married</option>
                    <option >Unmarried</option>
                    <option >Divorced</option>
                    </select>
                    </div>
                    </div>
        
                    </div>  
        
                    <div className="row row-cols-3">
                    <div className="col">
                    <div className="mb-3">
                    <label for="children_no" className="form-label">No of Children</label>
                    <input type="text" className="form-control" id="children_no" value ={this.state.children_no} onChange={this.onChangeChildrenNo}></input>
                    </div> 
                    </div> 
        
                    <div className="col">
                    <div className="mb-3" style={{marginLeft: '100px'}} >
                    <label for="alcohol" className="form-label">Alcoholic</label>
                    <br/>
                    
                    <div className="form-check form-check-inline" style={{marginTop: '7px'}} >
                    <input className="form-check-input" type="radio" name="alcoholRadioOptions" id="alcoholRadio1" value="true" checked={alcohol==="true"} onChange={this.onChangeAlcohol}/>
                    <label className="form-check-label" for="alcoholRadio1" >Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="alcoholRadioOptions" id="alcoholRadio2" value="false" checked={alcohol==="false"} onChange={this.onChangeAlcohol}/>
                    <label className="form-check-label" for="alcoholRadio2" >No</label>
                    </div>
                     
                    
                    </div> 
                    </div> 
        
                    <div className="col">
                    <div className="mb-3" >
                    <label for="smoking" className="form-label">Smoking</label>
                    <br/>
                    <div className="form-check form-check-inline" style={{marginTop: '7px'}} >
                    <input className="form-check-input" type="radio" name="smokingRadioOptions" id="smokingRadio1" value="true" checked={smoking==="true"} onChange={this.onChangeSmoking}/>
                    <label className="form-check-label" for="smokingRadio1">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio"  name="smokingRadioOptions" id="smokingradio2" value="false" checked={smoking==="false"} onChange={this.onChangeSmoking}/>
                    <label className="form-check-label" for="smokingradio2">No</label>
                    </div>
                    
                    
                    </div> 
                    </div> 
                    </div> 
                    
                    <br/>
                    <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 
        
        
                    <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Update Patient</button>
        
                            
                    
            </form>  
             </div>
           </div>
           
       )
   } 
}
