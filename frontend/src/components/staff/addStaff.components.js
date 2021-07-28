import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import swal from '@sweetalert/with-react';




export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeStaffUsername =this.onChangeStaffUsername.bind(this);
    this.onChangeStaffName =this.onChangeStaffName.bind(this);
    this.onChangeStaffAddress =this.onChangeStaffAddress.bind(this);
    this.onChangeStaffPhoneNo =this.onChangeStaffPhoneNo.bind(this);
    this.onChangeStaffPassword =this.onChangeStaffPassword.bind(this);
    this.onChangeStaffRole =this.onChangeStaffRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeCommission = this.onChangeCommission.bind(this);
    this.onChangeConsultCharge = this.onChangeConsultCharge.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSpeciality = this.onChangeSpeciality.bind(this);
    this.onChangeRegistration = this.onChangeRegistration.bind(this);
    this.usercheck = this.usercheck.bind(this);


    this.state ={
        staff_username:'',
        staff_name:'',
        staff_address:'',
        staff_phone:'',
        staff_password:'',
        staff_role:'',
        confirm_password:'',
        hide:'',
        otherhide:'',
        doctorhide:'',
        salary:'',
        commission:'',
        consult_charge:'',
        title:'',
        speciality:'',
        registration:'',
        alphebet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
        staff:'',
        doctor:''
    
    }
}
usercheck(){
    const stf={
        staff_username:this.state.staff_username
    }
    axios.post('http://localhost:5000/staffs/checkuser',stf)
    .then(res=>{
        if(res.data==null){}
        else{
            this.setState({
                staff_username:""
            },()=>{
                swal({
                    title: "Username already occupied!", 
                    icon: "error",
                }
                    )
            })
        }

    })

}

onChangeTitle(e){
    this.setState({
        title :e.target.value
    });
}
onChangeSpeciality(e){
    this.setState({
        speciality :e.target.value
    });
}
onChangeRegistration(e){
    this.setState({
        registration :e.target.value
    });
}

onChangeCommission(e){
    this.setState({
        commission :e.target.value
    });
}

onChangeConsultCharge(e){
    this.setState({
        consult_charge :e.target.value
    });
}

onChangeConfirmPassword(e){
    this.setState({
        confirm_password :e.target.value
    });
}
onChangeSalary(e){
    this.setState({
        salary :e.target.value
    });
}

onChangeStaffUsername(e){
    this.setState({
        staff_username :e.target.value
    });
}

onChangeStaffName(e){
    this.setState({
        staff_name :e.target.value
    });
}

onChangeStaffAddress(e){
    this.setState({
        staff_address :e.target.value
    });
}

onChangeStaffPhoneNo(e){
    this.setState({
        staff_phone :e.target.value
    });
}

onChangeStaffPassword(e){
    this.setState({
        staff_password :e.target.value
    });
}

onChangeStaffRole(e){
    this.setState({
        staff_role :e.target.value,
        hide:true
    })
    if(e.target.value=="Doctor"){
        this.setState({
            doctorhide:true,
            otherhide:""

        })
    }else{
        this.setState({
            doctorhide:"",
            otherhide:true
        })
    }

}
componentWillReceiveProps(){
    this.setState({
        hide:'',
        staff_role:''
    })

 
}

onSubmit(e){
    e.preventDefault();

    if(this.state.staff_password==this.state.confirm_password){

        if(this.state.staff_role=="Doctor"){
            axios.get('http://localhost:5000/staffs/getDoc')
            .then(result=> {
                const doc ={
                    staff_username:this.state.staff_username,
                    staff_name:this.state.staff_name,
                    staff_address:this.state.staff_address,
                    staff_phone:this.state.staff_phone,
                    staff_password:this.state.staff_password,
                    staff_role:this.state.staff_role,
                    title:this.state.title,
                    speciality:this.state.speciality,
                    reg_no:this.state.registration,
                    consult_charge:this.state.consult_charge,
                    commission:this.state.commission,
                    assiged_number:this.state.alphebet[Number(result.data.length)]
                }
            
                axios.post('http://localhost:5000/staffs/addDoc', doc)
                    .then(res=> {
                        this.props.onHide();
                        window.location.reload();
                            });
            })
            
        }
        else{
            const staff ={
                staff_username:this.state.staff_username,
                staff_name:this.state.staff_name,
                staff_address:this.state.staff_address,
                staff_phone:this.state.staff_phone,
                staff_password:this.state.staff_password,
                staff_role:this.state.staff_role,
                staff_salary:this.state.salary
            }
        
            axios.post('http://localhost:5000/staffs/addStaff', staff)
                .then(res=> {
                    this.props.onHide();
                    window.location.reload();
                        });
        }
        
    }
    else{

        swal({
            title: "Passwords Do Not Match!", 
            icon: "error",
        }
            ); }

        


}

onCancel(){
    this.setState({
        staff_name:"",
        staff_address:"",
        staff_password:"",
        staff_role:"",
        staff_phone:"",
        confirm_password:"",
        staff_username:""
    },()=>{this.props.onHide();}
    )
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
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>
<div className="container">


<div className="p-3 border bg-light">

        
<form onSubmit={this.onSubmit} >


<label  for="staff_role" className="form-label">Please Select a Role</label>
            <select className="form-control" aria-label=".form-select-lg example" id="staff_role" value ={this.state.staff_role} onChange={this.onChangeStaffRole} placeholder="Select Role" >
            <option selected hidden></option>
            <option >Admin</option>
            <option >Doctor</option>
            <option >Receptionist</option>
            <option >Dispenser</option>

            </select><br/>


<div hidden={!this.state.hide}>


<label for="staff_name" className="form-label">Upload Image</label>
<input type="file" className="form-control"></input>
<br/>

            <label for="staff_name" className="form-label required" >Name</label>
            <input type="text" className="form-control" id="staff_name" value ={this.state.staff_name} onChange={this.onChangeStaffName} required></input>
<br/>
            <label for="staff_address" className="form-label">Address</label>
            <textarea type="text" className="form-control" id="staff_address" value ={this.state.staff_address} onChange={this.onChangeStaffAddress} required></textarea>
            <br/>

            <label for="staff_phone" className="form-label">Phone No</label>
            <input type="text" className="form-control" id="staff_phone" value ={this.state.staff_phone} onChange={this.onChangeStaffPhoneNo} required></input>
            <br/>

            <div hidden={!this.state.otherhide}>
            <label for="staff_phone" className="form-label">Salary</label>
            <div class="input-group mb-3" >
            <input type="text" className="form-control" id="staff_phone" value ={this.state.salary} onChange={this.onChangeSalary} required={this.state.otherhide}></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs</span></div>
            </div>
            <br/>  
            </div>

            <div hidden={!this.state.doctorhide}>

            <label for="staff_phone" className="form-label">Title</label>
            <input type="text" className="form-control" id="staff_phone" value ={this.state.title} onChange={this.onChangeTitle} required={this.state.doctorhide}></input>
            <br/>

            <label for="staff_phone" className="form-label">Speciality</label>
            <input type="text" className="form-control" id="staff_phone" value ={this.state.speciality} onChange={this.onChangeSpeciality} required={this.state.doctorhide} ></input>
            <br/>

            <label for="staff_phone" className="form-label">Registration No</label>
            <input type="text" className="form-control" id="staff_phone" value ={this.state.registration} onChange={this.onChangeRegistration} required={this.state.doctorhide}></input>
            <br/>

            <div className="row">
                <div className="col">
                <label for="staff_phone" className="form-label">Consultation Charge</label>
            <div class="input-group mb-3" >
            <input type="text" className="form-control" id="staff_phone" value ={this.state.consult_charge} onChange={this.onChangeConsultCharge} required={this.state.doctorhide}></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs</span></div>
            </div>
                </div>
                <div className="col">
                <label for="staff_phone" className="form-label">Commission</label>
            <div class="input-group mb-3" >
            <input type="text" className="form-control" id="staff_phone" value ={this.state.commission} onChange={this.onChangeCommission} required={this.state.doctorhide}></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs</span></div>
            </div>
                </div>
            </div>
            <br/>  
            {/* <label for="staff_phone" className="form-label">Commission</label> */}

            {/*doctor area end*/}
            </div>

            <label for="staff_username" className="form-label">Username</label>
            <input type="text" className="form-control" id="staff_username" value ={this.state.staff_username} onChange={this.onChangeStaffUsername} onBlur={this.usercheck} required></input>
            <br/>

            <label for="staff_password" className="form-label">Password</label>
            <input type="password" className="form-control" id="staff_password" value ={this.state.staff_password} onChange={this.onChangeStaffPassword} required></input>
            <br/>

            <label for="staff_password_confirm" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="staff_password_confirm"  value ={this.state.confirm_password} onChange={this.onChangeConfirmPassword} required></input>

            

            <br/>
           
            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 


            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Add Staff</button>
            </div>                   
            
    </form>  
     </div>
   </div>
</Modal>
       )
   } 
}