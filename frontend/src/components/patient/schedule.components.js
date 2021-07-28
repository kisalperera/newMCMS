import { Component } from "react";
import {Link} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


export default class Patients extends Component {
    constructor(props){
        super(props);
        this.addModal = this.addModal.bind(this);
        this.onSelectDoc = this.onSelectDoc.bind(this);

        this.state={
            addModalShow:false,
            result:[],
            doctors:[],
            selectedDoc:'',
            schedule:[]

        }
} 
onSelectDoc(e){
    this.setState({
        selectedDoc :e.target.value,
        schedule:this.state.result.filter(el=>el.doctor_id==e.target.value)

    });
}
addModal(){
    this.setState({
        addModalShow:true
    })
}

componentDidMount(){
    axios.get('http://localhost:5000/staffs/getDoc')
    .then(res=> {
       this.setState({ doctors:res.data,
        selectedDoc:res.data[0]._id,
    })

    axios.get('http://localhost:5000/appointments/getAppointment', )
    .then(resp=> {
        this.setState({
            result:resp.data,
            schedule:resp.data.filter(el=>el.doctor_id==this.state.selectedDoc)
        })
        })
    })

    
   
}

   render(){
    let addModalClose=()=>{
        this.setState({addModalShow:false})
    }
   
    const localizer = momentLocalizer(moment)

    
       return(       
           <div>   
<div className="row">
   < div className="col-8">
<select className="form-control" onChange={this.onSelectDoc}>
{this.state.doctors.map(item=>{
        return<option value={item._id}>{item.staff_name} - {item.speciality} - Reg No:{item.reg_no}</option>
        })
        }
</select>
    
   </div>

   {/* <div className="col"><button type="button" className="btn btn-primary" onClick={()=>{this.addModal()}}>Add Appointment</button>
        <AddAppointment
         show={this.state.addModalShow}
         onHide={addModalClose}

         />
    </div> */}

</div>
<br/>
<div className="container">

               <link href="https://cdn.jsdelivr.net/npm/react-big-calendar@0.19.0/lib/css/react-big-calendar.css" rel="stylesheet"/>

                <Calendar 
                    localizer={localizer}
                    events={this.state.schedule}
                    startAccessor="date"
                    endAccessor="date"
                    titleAccessor="number"
                    style={{ height: 500 }}
                />
</div>
        </div> 


       )
   } 
}

