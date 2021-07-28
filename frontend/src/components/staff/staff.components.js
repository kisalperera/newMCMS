import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import AddStaff from "./addStaff.components";
import Payments from "./payments.components";
import '../../App.css';
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";


const StaffCard = (props) => {
  const  staff  = props.staff;   

  return(
      <div className="card bg-light">
          <img src="./images/user.png" class="card-img-top" style={{bordorRadius:200}}></img>
          <div className ="card-body" style={{color:'black'}} >
          <h5 class="card-title">{staff.staff_name}</h5>
              <h6 class="card-text">Role: {staff.staff_role }</h6>
              <h6 class="card-text">Username: {staff.staff_username}</h6>
              
<div className="row row-col-2"style={{marginTop:10}}>
<div class="btn-group" role="group" aria-label="Basic example">
<div className="col"><button className="btn btn-primary" style={{width:72}} onClick={
  ()=>{props.payment(staff._id,staff.staff_salary,staff.staff_name,staff.staff_role)}
}>Pay</button></div>

  <div className="col"><button className="btn btn-success" style={{width:72}}>Edit</button></div>
  <div className="col"><button className="btn btn-danger" style={{width:72}} 
  onClick={()=>{props.deleteStaff(staff._id)}}>
      Delete</button></div>
  </div>
</div>
             
          </div>
      </div>
  )
};


const DocCard = (props) => {
  const  doc  = props.doc;   

  return(
      <div className="card bg-light">
          <img src="./images/user.png" class="card-img-top" ></img>
          <div className ="card-body" style={{color:'black'}} >
          <h5 class="card-title">{doc.staff_name}</h5>
              <h6 class="card-text">Role: {doc.staff_role }</h6>
              <h6 class="card-text">Username: {doc.staff_username}</h6>
              
<div className="row row-col-2"style={{marginTop:10}}>

  <div className="col"><button className="btn btn-success" style={{width:90}}>Edit</button></div>
  <div className="col"><button className="btn btn-danger" style={{width:90}} 
  >
      Delete</button></div>
  
</div>
             
          </div>
      </div>
  )
};


class ShowStaffList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteStaff = this.deleteStaff.bind(this);
    this.staffList = this.staffList.bind(this);
    this.payment = this.payment.bind(this);

    this.state = {
      staffs: [],
      docs: [],
      addModalShow:false,
      paymentShow:false,
salary:'',
staff_id:'Yes'

    };
  }

  payment(id,salary,name,role){
    localStorage.setItem("payID",id);
    localStorage.setItem("paySalary",salary);
    localStorage.setItem("payName",name);
    localStorage.setItem("payRole",role);

    this.setState({
      paymentShow:true
    })
  }

deleteStaff(id){
  swal("You want to delete this staff member!", "Staff record will be removed from the system", "warning",{
    buttons: {
        Yes: {value:"Yes"},
        No: {value: "No" }
      }
})
.then((value) => {
    switch (value) {
      case "Yes":
        axios.delete('http://localhost:5000/staffs/deleteStaffByID/'+id)
    .then(res => console.log(res.data));

    this.setState({
        staffs: this.state.staffs.filter(el=>el._id!==id)
    })

        break;
   
      case "No":
        break;
    }
  });



    
}

  componentDidMount() {
    axios
      .get('http://localhost:5000/staffs/getStaff')
      .then(res => {
        this.setState({
          staffs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowStaffList');
      })
      axios
      .get('http://localhost:5000/staffs/getDoc')
      .then(res => {
        this.setState({
          docs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowStaffList');
      })
  };

staffList(){
  if(!this.state.staffs) {
    return("there is no staff record!");
  } else {
    return(this.state.staffs.map((staff, k) =>
    <StaffCard staff={staff} payment={this.payment} deleteStaff={this.deleteStaff} key={k} />)
    
    );
  }
}

  render() {

    let addModalClose=()=>{this.setState({addModalShow:false});
    }
    let paymentClose=()=>{this.setState({paymentShow:false});
    }

    const staffs = this.state.staffs;
    console.log("PrintBook: " + staffs);
    let staffList;
    let docList;


    

    if(!this.state.docs) {
      docList = "there is no staff record!";
    } else {
      docList = this.state.docs.map((doc, k) =>
        <DocCard doc={doc} key={k} />
      );
    }

    return (

        

      <div >
        <div className="container">

        <div className="row -md-6">
         <div className="col-10"><input className="form-control me-2" type="search" placeholder="Search Staff" aria-label="Search"  /> </div>

        <div className="col"><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}}>Add Staff</button>
      <AddStaff
         show={this.state.addModalShow}
         onHide={addModalClose}
         />

    <Payments
         show={this.state.paymentShow}
         staff_id={this.state.staff_id}
         salary={this.state.salary}
         onHide={paymentClose}
         />
    </div>

       </div>
<br/>

       <div className="ShowStaffList">
       <h4 style={{color:"black"}}>Staff</h4>
       <div className="list">
            {/* <h6>Staff</h6>
            <br/> */}

                {this.staffList()}
          </div>

          <h4 style={{color:"black"}}>Doctors</h4>

       <div className="list">
          {/* <h6>Doctors</h6>
          <br/> */}
                {docList}
          </div>

         

       </div>

        
          
        </div>
      </div>



    );
  }
}

export default ShowStaffList;