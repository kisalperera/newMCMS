import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment  from 'moment';


export default class AddItem extends Component {
constructor(props){
    super(props);

  
    this.onChnageExDate =this.onChnageExDate.bind(this);
    this.onChnageManDate =this.onChnageManDate.bind(this);
    this.onChangeUnits =this.onChangeUnits.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);


    this.state ={
        units:0,
        man_date:'',
        ex_date:'',
    }
}



onChnageManDate(date){
    this.setState({
        man_date :date
    });
  }

  onChnageExDate(date){
    this.setState({
        ex_date :date
    });
  }

onChangeUnits(e){
    let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({units: amount});
}

onSubmit(e){
    e.preventDefault();
var thisDay=new Date();
    const stock ={
        item_name:localStorage.getItem('itemforStocks'),
        stock_date:new Date(),
        today:thisDay.toLocaleDateString(),
        manufacture_date:this.state.man_date,
        expire_date:this.state.ex_date,
        units:this.state.units,

    }
    axios.post('http://localhost:5000/stocks/addstock', stock)
        .then(res=> {
            this.props.onHide();
            window.location.reload();
            console.log(res.data)});

}

onCancel(){
    this.setState({
        units:'',
        man_date:'',
        ex_date:'',
    })
    this.props.onHide();
}



   render(){
       return(
        <Modal
        {...this.props}
        
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
          <Modal.Title>Add Stock: {localStorage.getItem('itemforStocks')}</Modal.Title>
        </Modal.Header>
        <div className="container">


        <div className="p-3 border bg-light">

       
        <form onSubmit={this.onSubmit} >

        <div className="row">
            <div className="col">
            <div className="mb-3">
            <label for="item_name" className="form-label">Manufacture Date</label><br/>
            <DatePicker 
            selected={this.state.man_date}
            onChange={this.onChnageManDate}
            className="form-control"
            id="manDate"
            maxDate={moment().toDate()}
            /> </div>
            </div>



            <div className="col"> <div className="mb-3">
            <label for="item_name" className="form-label">Expire Date</label><br/>
            <DatePicker 
            selected={this.state.ex_date}
            onChange={this.onChnageExDate}
            className="form-control"
            id="exDate"
            minDate={moment().toDate()}
            /> </div></div>

        </div>
       
        
            <label for="category" className="form-label">Units</label>
            <input type="text" className="form-control" id="treatment_item" style={{width:200}}  value ={this.state.units} onChange={this.onChangeUnits} ></input>


          
           <br/>
            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 
            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Add Stock</button>        
            
    </form>  
     </div>
   </div>
</Modal>


       )
   } 
}