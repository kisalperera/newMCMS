import { Component } from "react";
import { Link } from "react-router-dom";

export default class docNavbar extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
}
logout(){
    localStorage.setItem('staff_role',"");
    window.location='/login'
}

render(){
let person=localStorage.getItem('staff_name');
let personRole=localStorage.getItem('staff_role');

return(
<div>
{/* style={{marginLeft:400}} */}
<div style={{height:80,backgroundColor:"#1976d2"}}>
<div className="row">
  <div className="col-4"style={{marginLeft:20, marginTop:25}}>
    <h4 style={{color:'white'}}>{person} | {personRole}</h4>
  </div>
  <div className="col"style={{marginLeft:600, marginTop:22, marginRight:-40}}>
  <button type="button" class="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
  window.location="/ediStaff/"+localStorage.getItem('staff_id');}} style={{backgroundColor:'#607d8b'}}>Account</button>
  </div>
  <div className="col"style={{marginTop:22}}>
  <button type="button" class="btn btn-danger" onClick={this.logout} >Sign Out</button>
  </div>

</div>
</div>


<nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{backgroundColor:'black'}}>
      <div className="collapse navbar-collapse" >
      <ul className="navbar-nav mr-auto">
            
      <li className="navbar-item" style={{marginLeft:30}}>
          <Link to="/disdash" className="nav-link" >Home</Link>
    </li> 
    <li className="navbar-item" hidden style={{marginLeft:50}}>
          <Link to="/issueDrugs" className="nav-link">Issue</Link>
    </li> 
    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/newIssue" className="nav-link">Issue</Link>
    </li> 
    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/inventory" className="nav-link">Inventory</Link>
        </li> 

       <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/supplier" className="nav-link">Suppliers</Link>
      </li>  

        
      </ul>
    </div>
 
</nav>
</div>
    );

};
}
