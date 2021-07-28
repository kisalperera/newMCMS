import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment  from 'moment';




export default class AddItem extends Component {
constructor(props){
    super(props);

  
    this.onCancel = this.onCancel.bind(this);
    this.onChnageDate = this.onChnageDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectDoc = this.onSelectDoc.bind(this);


    this.state ={
       date:'',
       doctors:[],
       selectedDoc:""
    }
}


componentWillReceiveProps(){
    axios.get('http://localhost:5000/staffs/getDoc')
        .then(res=> {
           this.setState({ doctors:res.data,
            selectedDoc:res.data[0]._id
        })
        })
}

onSelectDoc(e){
    this.setState({
        selectedDoc :e.target.value
    });    console.log(this.state.selectedDoc)

}


onChnageDate(date){
    this.setState({
        date :date
    });
    console.log(date.toLocaleDateString())
  }


onCancel(){
    this.setState({
        date:''
    })
    this.props.onHide();
}

onSubmit(){
    const num={
        doctor_id:this.state.selectedDoc,
        date:this.state.date.toLocaleDateString()
    }

    axios.post('http://localhost:5000/appointments/getNumbers', num)
        .then(res=> {
            
            const app={
                patient_id:localStorage.getItem('consideredPatint'),
                doctor_id:this.state.selectedDoc,
                date:this.state.date,
                number:"No: "+res.data
            }
            axios.post('http://localhost:5000/appointments/addAppointment', app)
                .then(res2=> {
                    this.props.onHide();
                })

        })

    
}


   render(){
       return(
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <div className="container">

<br/>
<div className="p-3 border bg-light">

        <label for="brand_name" className="form-label">Select Doctor</label>
         <select className="form-control" onChange={this.onSelectDoc}>
         {this.state.doctors.map(item=>{
        return<option value={item._id}>{item.staff_name} - {item.speciality} - Reg No:{item.reg_no}</option>
        })
        }
         </select>

<br/>
<label for="brand_name" className="form-label">Date</label><br/>
<DatePicker
            selected={moment().toDate()}
            onChange={this.onChnageDate}
            className="form-control"
            id="date_of_birth"
            minDate={moment().toDate()}
            />

<br/>
<br/>

            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 
            <button className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} onClick={this.onSubmit}>Add Appointment</button>        
            
</div>
   </div>
</Modal>


       )
   } 
}