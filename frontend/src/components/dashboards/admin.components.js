import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';
import {Line} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';


export default class Patients extends Component {
    constructor(props){
        super(props);
     

        this.state ={
            deps:[],
            addModalShow:false,
            consultations:[],
            jan:'',
            feb:'',
            march:'',
            april:'',
            may:'',
            jun:'',
            jul:'',
            staff:'',
            appModal:false,
            patients:'',
            doctors:'',
            bydoc1:[],
            bydoc2:[],
            bydoc3:[],


        };
    }

  

componentDidMount(){
    axios.get('http://localhost:5000/staffs/getStaff')
    .then(response => {this.setState({staff:response.data.length })
 })
 axios.get('http://localhost:5000/patients/getPatient')
    .then(response => {this.setState({patients:response.data.length })
 })
 axios.get('http://localhost:5000/staffs/getDoc')
    .then(response => {this.setState({doctors:response.data.length })
 })

axios.get('http://localhost:5000/consultations/getConsultation')
.then(response => {                                                                            
    this.setState({consultations: response.data})
    console.log("here1");
    this.setState({
        bydoc1:response.data.filter(el=>el.consult_doctor=="Dr.A.S. de Silva"),
        bydoc2:response.data.filter(el=>el.consult_doctor=="Dr.P.D.R. Deshan"),
        bydoc3:response.data.filter(el=>el.consult_doctor=="Dr.G.A.R. Ranawaka")

    })

    for(let i=0;i<response.data.length;i++){
        console.log("here");
        // console.log(response.data[i].consultation_date.getMonth())
        var date=new Date(response.data[i].consultation_date)
        var index=date.getMonth();
        if(index==0){this.setState({jan: Number(this.state.jan)+1})}
        if(index==1){this.setState({feb: Number(this.state.feb)+1})}
        if(index==2){this.setState({march: Number(this.state.march)+1})}
        if(index==3){this.setState({april: Number(this.state.april)+1})}
        if(index==4){this.setState({may: Number(this.state.may)+1})}
        if(index==5){this.setState({jun: Number(this.state.jun)+1})}
        if(index==6){this.setState({jul: Number(this.state.jul)+1})}

    }
})
}

   render(){

    const pie=()=>{
        return(
            <Doughnut
            data={{
                labels: [
                    'A.S. de Silva - ENT Sergon - Reg No:12345',
                    'P.D.R. Deshan - Pediatrician - Reg No:34765',
                    'G.A.R. Ranawaka - Pediatrician - Reg No:453678'
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [this.state.bydoc1.length, this.state.bydoc2.length, this.state.bydoc3.length],
                    backgroundColor: [
                      '#0d47a1',
                      '#FF8800',
                      '#007E33'
                    ],
                    hoverOffset: 4
                  }]
            }}
            >
            </Doughnut>
        )
    }

    const line=()=>{
        return(
            <Line
            data={{
                labels:["January", "February", "March", "April", "May", "June", "July"],
                datasets:[{
                    label:'# of Visits',
                    data: [this.state.jan, this.state.feb, this.state.march, this.state.april, this.state.may, this.state.jun, this.state.jul],
                    fill: false,
                    backgroundColor: 'rgb(75, 192, 192)',
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
            </Line>
        )
    }

    
       return(           
       
      <div style={{marginLeft:50}}>
<div className ="row">
<div className="col-2">

        <div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text">Total Patient Visits</h6>   
        <h3 class="card-title">{this.state.consultations.length}</h3>            
        </div></div>
        <br/>
        <div className="card bg-light" style={{height:95}}>
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
          </div></div>

</div>
<div className="col-6" style={{marginLeft:10}}>

    <div className="card bg-light">
          <div className ="card-body" style={{color:'black'}} >
          <div className="chart-container" style={{position: "relative", height:"60vh", width:"40vw"}}>
        <h6>Monthly No of Visits (for the current year)</h6>
    {line()}
    </div><br/>         
          </div></div>
    

<br/>



</div>

<div className="col-3">
<div className="card bg-light" style={{width:350}}>
    <br/>
          <div className ="card-body" style={{color:'black'}} >
          <div className="chart-container" style={{position: "relative", height:"60vh", width:"23vw"}}>
        <h6>Consultations by Doctor</h6>
    {pie()}
    </div>         
          </div></div>


</div>
</div>


           </div>




       )
   } 
}
