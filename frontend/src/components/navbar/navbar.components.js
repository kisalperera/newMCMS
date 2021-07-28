import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { light } from "@material-ui/core/styles/createPalette";
import NotificationBadge from 'react-notification-badge';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



export default class Navbar extends Component {
      constructor(props){
            super(props);
            this.logout=this.logout.bind(this);
            this.getCount=this.getCount.bind(this);
            this.createNotification = this.createNotification.bind(this);
            this.addstockNot = this.addstockNot.bind(this);


            this.state={
                  count:0,
                  notcount:0,

            }
      }

  

  getCount(){
    axios.get('http://localhost:5000/requests/getnewRequestCount')
    .then(res=>{
      this.setState({
        count:res.data
      })
      })
  }

  createNotification(type,string){
  

    switch (type) {
      case 'info':
        return(NotificationManager.info(string,'Item Request',3000))
        break;
      case 'success':
        return(NotificationManager.success('Success message', 'Title here'))
        break;
      case 'warning':
        return(NotificationManager.warning(string, 'Expiry Notice', 3000))
        break;
      case 'error':
        return(NotificationManager.error(string, 'Low Stocks!', 3000))
        break;
    }

  
} 

async addstockNot(){
  
 
  axios.get('http://localhost:5000/notifications/getnewLowStock')
  .then(res0=>{
    if(res0.data!=null){
    for(let i=0;i<res0.data.length;i++){

      this.setState({
        notcount:Number(this.state.notcount)+1
      })

      var string1=res0.data[i].not_item+"-"+res0.data[i].not_value+" Units";
      {/*res.data[i].expire_date.substring(0,10)*/}
      this.createNotification('error',string1)
    }

    }

    axios.get('http://localhost:5000/stocks/getall')
    .then(res=>{
      console.log("got all stocks");
  
      var today=new Date();
  
      today.setDate(today.getDate() + 30)
      for(let i=0;i<res.data.length;i++){
        console.log("stock"+i+"checking",res.data[i].expire_date,today);
        var date=new Date(res.data[i].expire_date)
        if(date<today){
          console.log("stock"+i+"proceeds");
  
          const ID={
            stock_id:res.data[i].stock_id
          }
  
          axios.post('http://localhost:5000/notifications/getByStockID',ID)
          .then(res1=>{  
            if(res1.data==null){
              
              var string=res.data[i].stock_id+" : in 30 Days";
              {/*res.data[i].expire_date.substring(0,10)*/}
              this.createNotification('warning',string)
  
              this.setState({
                notcount:Number(this.state.notcount)+1
              })
  
              console.log("stock"+i+"is not notified")
  
              const notifier={
                type:"Expire Notice",
                not_item:res.data[i].stock_id,
                not_value:res.data[i].expire_date,
            }          
            axios.post('http://localhost:5000/notifications/addNot', notifier)
            .then(res4=> { console.log("stock"+i+"added to not");
             })
             .catch(err=>{console.log("stock"+i+"failed");})
  
            }
            
          })
   }  
  }
  })


  })


  
}

 componentDidMount(){
  this.addstockNot();
  this.getCount();

  console.log("came to navbar");

  

axios.get('http://localhost:5000/requests/getnewRequest')
.then(res=>{
  for(let i=0;i<res.data.length;i++){
      var string=res.data[i].generic_name+" - "+res.data[i].strength
      this.createNotification('info',string)
  }
})

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
           <NotificationContainer/>

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
            
      {/* <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
    </li>  */}

      <li className="navbar-item" style={{marginLeft:30}}>
          <Link to="/admindash" className="nav-link">Home</Link>  
        </li> 
      
        <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/inventory" className="nav-link">Inventory</Link>
        </li> 

       <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/supplier" className="nav-link">Suppliers</Link>
      </li> 

    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/staff" className="nav-link">Staff</Link>
    </li> 

   


    <li className="navbar-item" style={{marginLeft:50}} onClick={()=>{this.setState({count:0})}} >
    <Link to="/request" className="nav-link" style={{width:130}} >Item Requests</Link>
    </li>  { 
        (this.state.count >0)
          ? <span style={{height:20,marginTop:10,marginLeft:-10}} className="translate-middle badge rounded-pill bg-danger">
          {this.state.count}
        </span> 
          : 
          <span style={{height:20,marginTop:10,marginLeft:-10}} >
        </span> 
      }
    
    
    
    


    <li className="navbar-item" style={{marginLeft:50}} onClick={()=>{this.setState({notcount:0})}}>
          <Link to="/notifications" className="nav-link">Notifications</Link>

    </li> 
    { 
        (this.state.notcount >0)
          ? <span style={{height:20,marginTop:10,marginLeft:7}} className="translate-middle badge rounded-pill bg-danger">
          {this.state.notcount}
        </span> 
          : <span style={{height:20,marginTop:10,marginLeft:7}} >
        </span> 
      }
    
    
    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/reports" className="nav-link">Reports</Link>

    </li> 
        
      </ul>
    </div>
 
</nav>

</div>
    );

};
}

