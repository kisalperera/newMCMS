
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeCurrentPassword =this.onChangeCurrentPassword.bind(this);
    this.onChangeNewPassword =this.onChangeNewPassword.bind(this);
    this.onChangeConfirmPassword =this.onChangeConfirmPassword.bind(this);
    this.confirm = this.confirm.bind(this);
    this.clear = this.clear.bind(this);


    this.state ={
        current_password:'',
        new_password:'',
        confirm_password:'',


    }
  }

  clear(){
      this.setState({
        current_password:'',
        new_password:'',
        confirm_password:''
      })
  }

  onChangeNewPassword(e){
    this.setState({
        new_password :e.target.value
    });
}

onChangeCurrentPassword(e){
    this.setState({
        current_password :e.target.value
    });
}

onChangeConfirmPassword(e){
    this.setState({
        confirm_password :e.target.value
    });
}
confirm(e){

    e.preventDefault();

if(this.state.new_password==this.state.confirm_password){
    const check={
        staff_username:"Admin",
        current_password:this.state.current_password,
        new_password:this.state.new_password
    }
    axios.post('http://localhost:5000/staffs/reset', check)
        .then(resp=> {
            if(resp.data=='true'){swal("Password Renewed", "success");
        this.props.onHide();
        }
        })
        .catch(err=>{swal("Password Incorrect!",  "error");})
        console.log(localStorage.getItem('staff_role'));
}
else{swal("Passwords does not match!", "error");}
    
}



  render() {
    return (
        <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered > 
               <Modal.Header closeButton >
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <  label for="staff_username" className="form-label">Current Password</label><br/>
            <input type="password" className="form-control" id="staff_username" value ={this.state.current_password} onChange={this.onChangeCurrentPassword}></input>
            <br/>
            <label for="staff_password" className="form-label">New Password</label><br/>
            <input type="password" className="form-control"  value ={this.state.new_password} onChange={this.onChangeNewPassword}></input>
        <br/>

        <label for="staff_password" className="form-label">Confirm Password</label><br/>
            <input type="password" className="form-control"  value ={this.state.confirm_password} onChange={this.onChangeConfirmPassword}></input>
        <br/>

            <div style={{margingLeft:200}}>
                <button className="btn btn-primary" onClick={this.confirm} style={{width:465}}>Confirm</button>

            </div>
        </Modal.Body>
      
        
      </Modal>
    );
  }
}

