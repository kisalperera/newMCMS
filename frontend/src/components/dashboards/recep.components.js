import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

const PatientsList = (props)=>{

    const date=new Date(props.patient.date_of_birth)
    return(
    <tr>
        <td>{props.patient.patient_name}</td>
        <td> - </td>
        <td>{props.patient.gender}</td>        <td> - </td>

        <td>DOB: {date.toLocaleDateString()}</td>        <td> - </td>

        <td>{props.patient.assigned_number}</td>

        </tr>
    )}

export default class Patients extends Component {
    constructor(props){
        super(props);

        this.patinetlist = this.patinetlist.bind(this);

        this.state ={
            
            

            appointments:[],
            today:0,
            patient:[],
            doc1:[],
            doc2:[],
            doc3:[]

        };
    }

    patinetlist(){
        return this.state.patient.map(current =>{
            return<PatientsList patient={current}  key={current._id}/>;
        })
    }  

componentDidMount(){
    axios.get('http://localhost:5000/appointments/getAppointment')
    .then(response => {
        this.setState({appointments:response.data.length })
        var today = new Date();

        this.setState({
            doc1:response.data.filter(el=>el.doctor_id=="60eb0fa95c44623adcb38ee9"),
            doc2:response.data.filter(el=>el.doctor_id=="60f4ddda7a76fe2608d7509b"),
            doc3:response.data.filter(el=>el.doctor_id=="60f626d5cce3dc4b38068314")
        })

        for(let i=0;i<response.data.length;i++){


            var check=new Date(response.data[i].date)
            if(today.toLocaleDateString()==check.toLocaleDateString()){
                this.setState({today:Number(this.state.today)+1})
            }
        }

 })

 axios.get('http://localhost:5000/patients/getallNumbers')
 .then(response => {  
    this.setState({patient:response.data})
console.log(response.data)
  }) 
 

}

   render(){

    // const pie=()=>{
    //     return(
    //         <Doughnut
    //         data={{
    //             labels: [
    //                 'A.S. de Silva - ENT Sergon - Reg No:12345',
    //                 'P.D.R. Deshan - Pediatrician - Reg No:34765',
    //                 'G.A.R. Ranawaka - Pediatrician - Reg No:453678'
    //               ],
    //               datasets: [{
    //                 label: 'My First Dataset',
    //                 data: [this.state.bydoc1.length, this.state.bydoc2.length, this.state.bydoc3.length],
    //                 backgroundColor: [
    //                   '#0d47a1',
    //                   '#FF8800',
    //                   '#007E33'
    //                 ],
    //                 hoverOffset: 4
    //               }]
    //         }}
    //         >
    //         </Doughnut>
    //     )
    // }

    const line=()=>{
        return(
            <Bar
            data={{
                labels: [
                    'A.S. de Silva - Reg No:12345',
                    'P.D.R. Deshan - Reg No:34765',
                    'G.A.R. Ranawaka - Reg No:453678'
                  ],
                    datasets:[{
                    label:'# of Appointments',
                    data: [this.state.doc1.length, this.state.doc2.length, this.state.doc3.length],
                    fill: false,
                    backgroundColor: ['rgb(75, 192, 192)',
                    'rgb(75, 100, 192)',
                    'rgb(75, 192, 100)'
                    ],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }}
            
            height={250}
            width={"10%"}
            options={{
                maintainAspectRatio:false
            }}
            >
            </Bar>
        )
    }

    
       return(           
       
      <div style={{marginLeft:50}}>
<div className ="row">
<div className="col-2">

        <div className="card bg-light" style={{height:120}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text"># of appointments today</h6>   
        <h3 class="card-title">{this.state.today}</h3>            
        </div></div>
        <br/>

        <div className="card bg-light" style={{height:120}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text"># of patients assigned</h6>   
        <h3 class="card-title">{this.state.patient.length}</h3>            
        </div></div>
        <br/>


        
        {/* <div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text">Registered Patients</h6>   
        <h3 class="card-title">{this.state.patients}</h3>            
        </div></div>
        <br/>

        <div className="card bg-light" style={{height:95}}>
          <div className ="card-body" style={{color:'black'}} >
          <h6 class="card-text">Available Staff</h6>   
          <h3 class="card-title">{this.state.staff}</h3>            
          </div></div>

          <br/>

          <div className="card bg-light" style={{height:95}}>
          <div className ="card-body" style={{color:'black'}} >
          <h6 class="card-text">Doctors</h6>   
          <h3 class="card-title">{this.state.doctors}</h3>            
          </div></div> */}

</div>

<div className="col-4">
<div className="card bg-light" style={{width:350}}>
    <br/>
          <div className ="card-body" style={{color:'black'}} >
          <div className="chart-container" style={{position: "relative", height:"60vh", width:"23vw"}}>
        <h6>Appointments by doctor</h6>
    {line()}
    </div>         
          </div></div>


</div>
<div className="col-6" style={{marginLeft:-60}}>

    <div className="card bg-light">
          <div className ="card-body" style={{color:'black'}} >
        <h6>Patients onboard</h6>
        <table className="table">
            <tbody>
            {this.patinetlist()}
            </tbody>
        </table>
    </div><br/>         
          </div>
<br/>



</div>


</div>


           </div>




       )
   } 
}
