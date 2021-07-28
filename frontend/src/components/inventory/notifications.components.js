import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";
import '../../App.css';
import swal from '@sweetalert/with-react';
import Order from "../supplier/purchaseOrder.components";


const NotificationCard = (props) => {
    const  notification  = props.notification;   
  
  
      return(
          <div>{(notification.type=="Low Stock")
          ?<div className="card card-danger" name="consultcard" style={{width:1200,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#b23939",marginTop:10}}>
          
              <div className ="card-body" style={{color:'white',marginTop:3}} >
                  <div className="row">
                    <div className="col-2">
                        <h6 class="card-text">{notification.type.substring(0,10)}</h6>
                    </div>
                    <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div><div className="col-4">
                        <h6 class="card-text">{notification.not_item }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{notification.not_value } Units</h6>
                    </div>

                    <div className="col-2"style={{marginTop:-10,marginLeft:10}}>
                        <button style={{width:150}} className="btn btn-warning"
                        onClick={()=>{props.viewOrder()}}
                        >Order Item</button>
                    </div>
    
                </div> 
                               
              </div>
          </div>
          :<div className="card card-danger" name="consultcard" style={{width:1200,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#ff8f00  ",marginTop:10}}>
          
          <div className ="card-body" style={{color:'white',marginTop:3}} >
              <div className="row">
                <div className="col-2" >
                    <h6 class="card-text">{notification.type}</h6>
                </div>
                <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div><div className="col-4">
                    <h6 class="card-text">{notification.not_item }</h6>
                </div>
                <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div>
                
                <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                    <h6 class="card-text">{notification.not_value.substring(0,10) }</h6>
                </div>
                <div className="col-2"style={{marginTop:-10,marginLeft:10}}>
                        <button style={{width:150}} className="btn btn-danger"
                        onClick={()=>props.removestock(notification.not_item)}
                        >Remove Stock</button>
                    </div>

            </div>
                           
          </div>
      </div>
  
          }

          </div>
        

        
    )
   
  };


  const OldNotificationCard = (pr) => {
    const  notification  = pr.notification;   
  
  
      return(
          <div>{(notification.type=="Low Stock")
          ?<div className="card card-danger" name="consultcard" style={{width:1200,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#37474F",marginTop:10}}>
          
          <div className ="card-body" style={{color:'white',marginTop:3}} >
                  <div className="row">
                    <div className="col-2">
                        <h6 class="card-text">{notification.type.substring(0,10)}</h6>
                    </div>
                    <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div><div className="col-4">
                        <h6 class="card-text">{notification.not_item }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{notification.not_value } Units</h6>
                    </div>

                    <div className="col-2"style={{marginTop:-10,marginLeft:10}}>
                        <button style={{width:150}} className="btn btn-warning"
                        onClick={()=>{pr.viewOrder()}}
                        >Order Item</button>
                    </div>
    
                </div> 
                               
              </div>
          </div>          :<div className="card card-danger" name="consultcard" style={{width:1200,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#263238",marginTop:10}}>
          
          <div className ="card-body" style={{color:'white',marginTop:3}} >
              <div className="row">
                <div className="col-2" >
                    <h6 class="card-text">{notification.type}</h6>
                </div>
                <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div><div className="col-4">
                    <h6 class="card-text">{notification.not_item }</h6>
                </div>
                <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div>
                
                <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                    <h6 class="card-text">{notification.not_value.substring(0,10) }</h6>
                </div>
                <div className="col-2"style={{marginTop:-10,marginLeft:10}}>
                        <button style={{width:150}} className="btn btn-danger"
                        onClick={()=>pr.removestock(notification.not_item)}
                        >Remove Stock</button>
                    </div>

            </div>
                           
          </div>
      </div>
          }
          </div>
    )
  };

export default class Inventory extends Component {
    constructor(props){
        super(props);

        this.notificationList = this.notificationList.bind(this);
        this.OldNotificationlist = this.OldNotificationlist.bind(this);
        this.removestock = this.removestock.bind(this);
        this.viewOrder = this.viewOrder.bind(this);


        this.state ={
            notifications:[],
            search:"",
            addModalShow:false,
            addOrderShow:false,
            newNot:[]
        };
    }

viewOrder(){
 this.setState({
    addOrderShow:true
 })   
}

removestock(id){
    swal("Do you want to remove this stock!", "Stock and remaining items will be removed from the system", "warning",{
        buttons: {
            Yes: {value:"Yes"},
            No: {value: "No" }
          }
    })
    .then((value) => {
        switch (value) {
          case "Yes":
              const del={
                stock_id:id
              }
            console.log(id)

            const dlt={
                stock_id:id
            }
            axios.post('http://localhost:5000/stocks/removefromNot',dlt)
            .then(res => 
                axios.post('http://localhost:5000/notifications/removefromNot',dlt)
                    .then(res => {
                        this.setState({
                            notifications: this.state.notifications.filter(el=>el.not_item!==id)
                        })
                    })                
                );
                // break;
          case "No":
            break;
        }
      });
}

componentDidMount(){
    // axios.get('http://localhost:5000/stocks/get/60f6a9fec0f2521c5caef75f')
    // .then(response => {
    //     var today=new Date();
    //     today.setDate(today.getDate() + 30)
    //     var date=new Date(response.data.expire_date)
    //     if(today<date){
    //         console.log("No expiry notice" )
    //     }
    //     else{
    //         console.log("Expiry notice" )

    //     }
    //    })


axios.get('http://localhost:5000/notifications/getNot')
.then(response => {                                                                            
    this.setState({
        notifications: response.data,
        newNot:response.data.filter(el=>el.status=="new")
    },()=>{
    for(let i=0;i<this.state.newNot.length;i++){
        axios.post('http://localhost:5000/notifications/changeNotstatus/'+this.state.newNot[i]._id)
        .then(response => { })
    }


    })



})
.catch((error) =>{
    console.log(error);
})

}



notificationList(){
    if(this.state.newNot.length>0){
        return this.state.notifications.filter(el=>el.status=="new").map(current =>{
            return<NotificationCard viewOrder={this.viewOrder} removestock={this.removestock} notification={current}  key={current._id}/>;
        })
    }
  else{
      return(<>No new notifications available!</>)
  }
}

OldNotificationlist(){
    return this.state.notifications.filter(el=>el.status=="old").map(current =>{
        return<OldNotificationCard viewOrder={this.viewOrder} removestock={this.removestock} notification={current}  key={current._id}/>;
    })
}

   render(){
    let addorderClose=()=>{this.setState({addOrderShow:false});}

       return(
           
       <div style={{marginLeft:50}}>
       
       <h5 style={{marginLeft:-10}}>Notifications</h5>

<br/>

< div >

<h6>New Notifications</h6>

{this.notificationList()}
<br/><br/>


<h6>Older</h6>
{this.OldNotificationlist()}
  
           
           </div> 

           <Order
         show={this.state.addOrderShow}
         onHide={addorderClose}
         />
           </div>




       )
   } 
}
