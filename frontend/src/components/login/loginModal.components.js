
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeStaffUsername =this.onChangeStaffUsername.bind(this);
    this.onChangeStaffPassword =this.onChangeStaffPassword.bind(this);
    this.Login = this.Login.bind(this);

    this.state ={
        staff_username:'',
        staff_password:''
    }
  }

  onChangeStaffUsername(e){
    this.setState({
        staff_username :e.target.value
    });
}

onChangeStaffPassword(e){
    this.setState({
        staff_password :e.target.value
    });
}

Login(e){

    e.preventDefault();
console.log("came here");

    const login={
        staff_username:this.state.staff_username,
        staff_password:this.state.staff_password
    }
    axios.post('http://localhost:5000/staffs/login', login)
        .then(resp=> {
            if(resp.data=='Password incorrect!'){swal("Password Incorrect!", "Check Your Password", "warning");}
            else{
            let role=resp.data.staff_role;
            let name=resp.data.staff_name;
            let id=resp.data._id;
            console.log("response",resp);
            localStorage.setItem('staff_role',role);
            localStorage.setItem('staff_name',name);
            localStorage.setItem('staff_id',id);

            if(role=='Admin'){
                window.location='/admindash'
            }
            if(role=='Doctor'){
                window.location='/patientDr'
            }
            if(role=='Receptionist'){
                window.location='/recepdash'
            }
            if(role=='Dispenser'){
                window.location='/disdash'
            }
        }
        })
        .catch(err=>{

            const logindoc={
                staff_username:this.state.staff_username,
                staff_password:this.state.staff_password
            }
            axios.post('http://localhost:5000/staffs/logindoc', logindoc)
            .then(response=>{
                if(response.data=='Password incorrect!'){swal("Password Incorrect!", "Check Your Password", "warning");}
            else{
            let role=response.data.staff_role;
            let name=response.data.staff_name;
            let id=response.data._id;
            console.log("response",response);
            localStorage.setItem('staff_role',role);
            localStorage.setItem('staff_name',name);
            localStorage.setItem('staff_id',id);

            window.location='/patientDr'
            }
            
        }).catch(err=>{
            swal("User Not Found!", "Check Your Username", "error");

        })


        })
        console.log(localStorage.getItem('staff_role'));

}



  render() {
    return (
        <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >        <Modal.Header closeButton >
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <  label for="staff_username" className="form-label">Username</label><br/>
            <input type="text" className="form-control" id="staff_username" value ={this.state.staff_username} onChange={this.onChangeStaffUsername}></input>
            <br/>
            <label for="staff_password" className="form-label">Password</label><br/>
            <input type="password" className="form-control" id="staff_password" value ={this.state.staff_password} onChange={this.onChangeStaffPassword}></input>
        <br/>

            <div style={{margingLeft:200}}>
                <button className="btn btn-primary" onClick={this.Login} style={{width:465}}>Login</button>

            </div>
        </Modal.Body>
      
        
      </Modal>
    );
  }
}

