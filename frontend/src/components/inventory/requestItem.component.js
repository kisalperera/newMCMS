
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeName =this.onChangeName.bind(this);
    this.onChangeCategory =this.onChangeCategory.bind(this);
    this.onChangeStrength = this.onChangeStrength.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.request = this.request.bind(this);


    this.state ={
        generic_name:'',
        category:'',
        strength:'',
        strength_type:'⮟',
        description:''
    }
  }

  onChangeName(e){
    this.setState({
        generic_name :e.target.value
    });
}

onChangeCategory(e){
    this.setState({
        category :e.target.value
        
    },()=>{
        if(this.state.category=="Pill"||this.state.category=="Cream"){this.setState({strength_type:"mg"})}
    if(this.state.category=="Syrup"){this.setState({strength_type:"ml"})}
    });
    
}
onChangeStrength(e){
    this.setState({
        strength :e.target.value
    });
}
onChangeDescription(e){
    this.setState({
        description :e.target.value
    });
}


request(e){
    e.preventDefault();
    var description='';
if(this.state.description==""){description="No Description";}
else{description=this.state.description;}

    const req={
        generic_name:this.state.generic_name, 
        type:this.state.category,  
        strength:this.state.strength+this.state.strength_type,   
        description:description,
        doctor_name:localStorage.getItem("staff_name")
    }

    const check={
        generic_name:this.state.generic_name, 
        strength:this.state.strength,   
    }
    axios.post('http://localhost:5000/inventoryItems/findpresent', check)
    .then(result=> {
        console.log("check", result.data)
            swal("Item Already Available", "Cannot request an available item", "warning");
            this.setState({
                generic_name:'',
                category:'',
                strength:'',
                strength_type:'⮟',
                description:''
                })
    })
    .catch(err=>{
            axios.post('http://localhost:5000/requests/additemRequests', req)
            .then(res=> {
                swal("Request Sent", "The admin can see your request", "success");
                this.setState({
                generic_name:'',
                category:'',
                strength:'',
                strength_type:'⮟',
                description:''
                },()=>{this.props.onHide();}
                )
            })
    })

   

}

render() {
    return (
        <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >        <Modal.Header closeButton >
          <Modal.Title>Request Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        < label for="staff_username" className="form-label">Generic Name</label><br/>
            <input type="text" className="form-control" id="staff_username" value ={this.state.generic_name} onChange={this.onChangeName}></input>
            <br/>

        <div className="row">
        <div className="col">
        <label for="category" className="form-label">Category</label>
                    <select className="form-control" aria-label=".form-select-lg example" id="category" value ={this.state.category} onChange={this.onChangeCategory} >
                    <option selected>Select Category</option>
                    <option >Pill</option>
                    <option >Syrup</option>
                    <option >Cream</option>
                    </select>
        </div>

            <div className="col">
            <label for="brand_name" className="form-label">Strength</label>
                        <div class="input-group mb-3" >
                        <input type="text" className="form-control" id="brand_name" value ={this.state.strength} onChange={this.onChangeStrength} ></input>
                        <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">{this.state.strength_type}</span></div>

            </div>
            </div>

            </div><br/>


        <label className="form-label">Description</label><br/>
            <textarea type="text" className="form-control" id="staff_username" value ={this.state.description} onChange={this.onChangeDescription}></textarea>
            <br/>
            <br/>

            <div style={{margingLeft:200}}>
                <button className="btn btn-primary" onClick={this.request} style={{width:465}}> Send Request</button>

            </div>
        </Modal.Body>
      
        
      </Modal>
    );
  }
}

