import { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import moment  from 'moment';
import DatePicker from "react-datepicker";
import '../../App.css';
import swal from '@sweetalert/with-react';


const SelectedOrder = (props) => {
    const umaxunits=props.order.units

    const [order, setorder] = useState({});

      useEffect(() => {
          setorder(props.order)
        }, [] );

    const onChange = (e) => {
        setorder({...order, [e.target.name]: e.target.value})
    }
  
    const [dates, setdates] = useState({
        manufacDate:'',
        expireDate:''
    });

      return(

        <div className="card" id="thiscard" style={{marginBottom:20}} >
           
            <div className ="card-body" style={{color:'black',width:770}} >
                <div className="row">
                  <div className="col-10">
                      <h6 class="card-text">{props.order.item}</h6>
                  </div>
                  <div className="col-1" >
                      <button className="btn btn-danger" style={{width:80}} onClick={()=>{props.return(order.item)}}> Return</button>
                  </div>
                  </div>
                  
                  <div className="row">

                 <div className="col-2">
                  <label for="consult_charge" className="form-label">Units</label>
                  <input className="form-control" type="number" value={order.units} name="units"
                  onChange={onChange}
                  max={umaxunits}
                  ></input>
                  </div>

                  <div className="col-4">
                  <label for="consult_charge" className="form-label">Manufacture Date</label>
                        <DatePicker type="input"
                        name="manufacDate"
                        onChange={(date) => setdates({...dates,manufacDate: date})}
                        className="form-control"
                        maxDate={moment().toDate()}
                        selected={dates.manufacDate}
                        />  
                  </div>
                  <div className="col-4">
                  <label for="consult_charge" className="form-label">Expire Date</label>
                        <DatePicker type="input"
                        name="expireDate"
                        onChange={(date) => setdates({...dates,expireDate: date})}
                        className="form-control"
                        minDate={moment().toDate()}
                        selected={dates.expireDate}

                        /> 
                  </div>  
                  <div className="col-1" style={{marginTop:30}} >
                      <button className="btn btn-success" onClick={
                          ()=>{props.confirm(props.order.item,order.units,dates.manufacDate,dates.expireDate)}
                      }>Confirm</button>
                  </div>
              </div>

            </div>
        </div>
    )
   
  };


export default class AddItem extends Component {
constructor(props){
    super(props);
    
    this.onCancel = this.onCancel.bind(this);
    this.List = this.List.bind(this);
    this.return = this.return.bind(this);
    this.confirm = this.confirm.bind(this);



    this.state ={
        item_name:'',
        brand_name:'',
        category:'',
        unit_price:0,
        selling_price:0,
        dose:'',
        strength:'',
        purchase:[],
        strength_type:'⮟'

    }
}

return(item){

    swal("You want to return this Item!", "It will notify the supplier through an email", "warning",{
        buttons: {
            Yes: {value:"Yes"},
            No: {value: "No" }
          }
    })
    .then((value) => {
        switch (value) {
          case "Yes":
            const ret ={
                PurchaseID:localStorage.getItem("currentOrder"),
                name:item
            }
            this.setState({
                purchase: this.state.purchase.filter(el=>el.item!==item)
            },()=>{
                axios.post('http://localhost:5000/purchases/return',ret)
            .then(res=>{
                if(this.state.purchase.length==0){
                    axios.delete('http://localhost:5000/purchases/deletepurchase/'+localStorage.getItem("currentOrder"))
                    .then(res=>{
                        this.props.onHide();
                    })
                }
            })
            })

            break;
       
          case "No":
            break;
        }
      });


   
    

}

confirm(name,units,manufac,expire){
    console.log("test1")
    axios.get('http://localhost:5000/purchases/getpurchaseByIDDetails/'+localStorage.getItem("currentOrder"))
    .then(res=>{
        console.log(res.data)
        var thisDay=new Date();

        const stock={
            item_name:name,
            stock_date:new Date(),
            manufacture_date:manufac,
            expire_date:expire,
            units:units,
            today:thisDay.toLocaleDateString(),
            supplier:res.data.supplier_name
        }
        axios.post('http://localhost:5000/stocks/addstock',stock)
                .then(res1=>{
                    console.log("test3")

                    this.setState({
                        purchase: this.state.purchase.filter(el=>el.item!==name)
                    },()=>{
                        const ret ={
                            PurchaseID:localStorage.getItem("currentOrder"),
                            name:name
                        }
        
                        axios.post('http://localhost:5000/purchases/confirmed',ret)
                        .then(res2=>{
                            swal("Stock Updated", "The items are available to use from now", "success")


                            if(this.state.purchase.length==0){
                                axios.delete('http://localhost:5000/purchases/deletepurchase/'+localStorage.getItem("currentOrder"))
                                .then(res3=>{
                                    this.props.onHide();
                                    
                                })
                            }
                        })
                    })
                })
    })

}

componentWillReceiveProps(){

    axios.get('http://localhost:5000/purchases/getpurchaseByID/'+localStorage.getItem("currentOrder"))
    .then(response => {                                                                            
        this.setState({purchase: response.data})
    })
    .catch((error) =>{
        console.log(error);
    })

}
onCancel(){
    this.props.onHide();
}

List(){
        return this.state.purchase.map(current =>{
            return<SelectedOrder order={current} confirm={this.confirm} return={this.return} key={current._id}/>;
        })
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
          <Modal.Title>Purchase Order</Modal.Title>
        </Modal.Header>
<div className="container">
    <br/>
        {this.List()}

      
   </div>
</Modal>
       )
   } 
}
