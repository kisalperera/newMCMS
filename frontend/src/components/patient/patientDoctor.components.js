import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';


let nextNumber=1;
function searchPatients(patient) {
    return function (e) {
    return e.patient_name.toLowerCase().includes(patient.toLowerCase()) ||!patient;      
    }
  }

const Patient = (props)=>{

    const date=new Date(props.patient.date_of_birth)
    return(
    <tr>
        <td>{props.patient.patient_name}</td>
        <td>{date.toLocaleDateString()}</td>
        <td>{props.patient.gender}</td>
        <td>{props.patient.patient_phone}</td>

        <td>
            
            <button type="button" class="btn btn-primary" style={{width: 70}} onClick={(e) => {
                e.preventDefault();
                window.location="/consultation/"+props.patient._id;}}>History</button>
                    
        |<button type="button" class="btn btn-success" style={{width: 70}} onClick={(e) => {
        e.preventDefault();
        window.location="/editPatient/"+props.patient._id;
        
        }}>Edit</button>
             
        </td>                                                            
    </tr>
    )}

export default class Patients extends Component {
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.assignNumber = this.assignNumber.bind(this);
        this.state ={
            patients:[],
            search:""

        };
}

    onChangeSearch(e) {
        this.setState({
      search: e.target.value
        });
    }

componentDidMount(){
axios.get('http://localhost:5000/patients/getPatient')
.then(response => {                                                                            
    this.setState({patients: response.data})
})
.catch((error) =>{
    console.log(error);
})

}

assignNumber(id){


    axios.get('http://localhost:5000/patients/getNextNumber')
    .then((res) => {nextNumber =res.data});

    swal({
        text:"Do you want to assign a number to this patient ?",
        buttons: true,
        content: (  
            <div>
            <h1>{nextNumber}</h1>
            </div>
            )
        }).then(()=>{
            

            swal({
                text:"Number Assigned",
                content: (  
                    <div>
                    <h1>{nextNumber}</h1>
                  </div>
                    ),
                icon:  "success"   
            })

            const patient ={assigned_number:nextNumber}

        axios.post('http://localhost:5000/patients/assignNumber/'+id,patient)
        .then(res => console.log(res.data));
        }
          );   
}



patientList(){
    return this.state.patients.filter(searchPatients(this.state.search)).map(currentpatient =>{
        return<Patient patient={currentpatient} assignNumber={this.assignNumber} key={currentpatient._id}/>;
    })
}




   render(){

       return(
           
       <div>
           {/* <div>
               <input type="text" value={this.number}/>
           </div> */}
           <div className="row -md-6">
         <div className="col-10"><input className="form-control me-2" type="search" placeholder="Search Patient" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch} /> </div>

        <div className="col">
    </div>

       </div>
      
<br/>
< div className="p-3 border bg-light" >


           <table className="table" >
               <thead className="thead-light">
                   <tr>
                       {/* <th>Patient ID</th> */}
                       <th>Patient Name</th>
                       <th>Date of Birth</th>
                       <th>Gender</th>
                       <th>Phone No</th>
                       <th>Actions </th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.patientList()} 
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}
