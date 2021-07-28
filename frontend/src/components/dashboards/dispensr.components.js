import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';


export default class Patients extends Component {
    constructor(props){
        super(props);
     

        this.state ={
            stocks:[],
            inventoryItems:[],
            inventoryItemnames:[],
            exp:'',
            expiems:''




        };
    }

  

componentDidMount(){

    axios.get('http://localhost:5000/externalPrescriptions/getAllExP')
    .then(response => {this.setState({exp:response.data })
    })

    axios.get('http://localhost:5000/externalPrescriptionItems/getExPItems')
    .then(response => {this.setState({expiems:response.data })
    })

    axios.get('http://localhost:5000/inventoryItems/')
    .then(response => {this.setState({inventoryItems:response.data })

    for(let i=0;i<response.data.length;i++){
        this.setState({
            inventoryItemnames:this.state.inventoryItemnames.concat(response.data[i].item_name)
        })
        const getStock={
            item_name:response.data[i].item_name
        }
        axios.post('http://localhost:5000/stocks/getstockunits',getStock)
        .then(resp=> {
            this.setState({stocks:this.state.stocks.concat(resp.data) })
     })

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
            <Bar
            data={{
                labels:this.state.inventoryItemnames,
                datasets:[{
                    label:'Stock level',
                    data:this.state.stocks,
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
            </Bar>
        )
    }

    
       return(           
       
      <div style={{marginLeft:50}}>

<div className="card bg-light" style={{width:1230}}>
          <div className ="card-body" style={{color:'black'}} >
          <div className="chart-container" style={{position: "relative", height:"45vh", width:"85vw"}}>
        <h6>Current stock level</h6>
    {line()}
    </div><br/>         
          </div></div>

          <br/>

          <div className ="row">
<div className="col-2">
<div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text">Total inventory items</h6>   
        <h3 class="card-title">{this.state.inventoryItems.length}</h3>            
        </div></div>
        </div>
<div className="col-2" style={{width:230}}>
<div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text"># External Prescriptions</h6>   
        <h3 class="card-title">{this.state.exp.length}</h3>            
        </div></div>
        </div>

        <div className="col-2" style={{width:270}}>
<div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text"># External Prescription Items</h6>   
        <h3 class="card-title">{this.state.expiems.length}</h3>            
        </div></div>
        </div>

        <div className="col-4">
<div className="card bg-light" style={{height:95}}>
        <div className ="card-body" style={{color:'black'}} >
        <h6 class="card-text">Mostly used item for External Prescriptions</h6>   
        <h5 class="card-title">Thyophyllin-Satbutamol-200mg</h5>            
        </div></div>
        </div>



</div>

{/* <div className ="row">
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
</div> */}


           </div>




       )
   } 
}