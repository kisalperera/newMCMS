
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

var nextNumber=1;


export default class AssignNumbers extends Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);
    this.onSelectDoc = this.onSelectDoc.bind(this);
   
   
    this.state={
      selectedDoc:'',
      doctors:[],
      nextNumber:''
    }

  }
  onSelectDoc(e){
    this.setState({
        selectedDoc :e.target.value
    });    console.log(this.state.selectedDoc)

    const doc={
      assigned_doctor:e.target.value
    }

    axios.get('http://localhost:5000/staffs/getDocNumber/'+e.target.value)
    .then(res1 =>{
      axios.post('http://localhost:5000/patients/getNextNumber',doc)
      .then(res2 =>{
        this.setState({
          nextNumber:res1.data+res2.data
        })
      } ).catch(err=>{
        this.setState({
          nextNumber:res1.data+1
        })      })

    })
    
}

  componentDidMount(){
    axios.get('http://localhost:5000/staffs/getDoc')
    .then(res=> {
       this.setState({ doctors:res.data,
    })
    })
  }

  onConfirm(id){


        const patient ={
            assigned_number:this.state.nextNumber,
            assigned_doctor:this.state.selectedDoc
        }

        axios.post('http://localhost:5000/patients/assignNumber/'+localStorage.getItem('consideredPatint'),patient)
        .then(res => {
          console.log(res.data);
          this.props.onHide();
        }
        );
        
        
          
  }

  render() {
    return (
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >        <Modal.Header closeButton>
          <Modal.Title>Assign Number</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>

         <select className="form-control" onChange={this.onSelectDoc}>
           <option selected hidden>Select a Doctor</option>
         {this.state.doctors.map(item=>{
        return<option value={item._id}>{item.staff_name} - {item.speciality} - Reg No:{item.reg_no}</option>
        })
        }
         </select>

<br/>
          <h3 hidden={!this.state.nextNumber}>Number: {this.state.nextNumber}</h3><br></br>

        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary"  onClick={this.props.onHide}>Close</Button>
          <Button variant="primary"disabled={!this.state.selectedDoc} onClick={this.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// export default AssignNumbers;







