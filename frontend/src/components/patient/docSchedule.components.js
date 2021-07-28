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

        this.state={
           
            schedule:[]

        }
} 

componentDidMount(){

    axios.get('http://localhost:5000/appointments/getAppointment', )
    .then(resp=> {
        this.setState({
            result:resp.data,
            schedule:resp.data.filter(el=>el.doctor_id==localStorage.getItem("staff_id"))
        })
        })
}

   render(){
   
   
    const localizer = momentLocalizer(moment)

    
       return(       
           <div>   

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

