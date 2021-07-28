import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import '../../App.css';
import LoginModal from "./loginModal.components";


export default class AddItem extends Component {

    constructor(props){
        super(props);
    
        
        this.loginModal = this.loginModal.bind(this);

    
        this.state ={
            deps:[],
            addModalShow:false,
        
        }
    }

loginModal(){
    this.setState({addModalShow:true})
}

    
    render(){
        const {deps}=this.state;
    let addModalClose=()=>this.setState({addModalShow:false});

        return(
<div className="login">
<div className="sticky-top bg-light" style={{height:100,backgroundColor:'white'}}>
<div className="row">
<div className="col" style={{marginRight:800}}>
    <div className="logo" style={{color:"#18215e",fontSize:60,fontWeight:1000,fontFamily:'Arial',marginLeft:20}}>
        MEDICA 
    </div>
</div>
<div className= "col" style={{marginleft:1000,marginTop:25}}>
<button className="btn btn-primary" style={{width:200,height:50}} onClick={()=>{this.loginModal()}}>Sign In</button>
<LoginModal
         show={this.state.addModalShow}
         onHide={addModalClose}
         />
</div>
</div>
</div>

<div className="row">
<div className="col-6" style={{backgroundColor:"white",height:600,width:800,opacity: 0.5}}>
    <br/>    <br/>
    <br/>
    <br/>


    <div style={{marginLeft:200}}>

    <p style={{color:"black",fontSize:40,fontFamily:"calibri",fontWeight:1000}}>
    Personal Care <br/> for Your  Healthy Living!</p><br/><br/>
    <p style={{color:"black",fontSize:20,fontFamily:"calibri",fontWeight:500}}>
    We’re proud to belong to a pioneer in healthcare that <br/>continuously innovates.
     We welcome passionate<br/> individuals who want to be part of our growing legacy. 
     <br/> From wellness to preventive care to treatment of illnesses<br/> we take care of it all,
      so you can have a better tommorrow</p>
    </div>

</div>
</div>


</div>

        )
    }
}


