import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";


export default class editItem extends Component {
constructor(props){
    super(props);

    this.onChangeItemID =this.onChangeItemID.bind(this);
    this.onChangeItemName =this.onChangeItemName.bind(this);
    this.onChangeBrandName =this.onChangeBrandName.bind(this);
    this.onChangeCategory =this.onChangeCategory.bind(this);
    this.onChangeUnitPrice =this.onChangeUnitPrice.bind(this);
    this.onChangeSellingPrice =this.onChangeSellingPrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state ={
        item_id:0,
        item_name:'',
        brand_name:'',
        category:'',
        unit_price:0,
        selling_price:0

    }
}

componentWillReceiveProps(){
    axios.get('http://localhost:5000/inventoryItems/'+this.props.editid)
    .then(response=> {
        this.setState({
            item_id:response.data.item_id,
            item_name:response.data.item_name,
            brand_name:response.data.brand_name,
            category:response.data.category,
            unit_price:response.data.unit_price,
            selling_price:response.data.selling_price
        })
    })
    .catch(function (error){
        console.log(error);
    })
}

onChangeItemID(e){
    this.setState({
        item_id :e.target.value
    });
}

onChangeItemName(e){
    this.setState({
        item_name :e.target.value
    });
}

onChangeBrandName(e){
    this.setState({
        brand_name :e.target.value
    });
}

onChangeCategory(e){
    this.setState({
        category :e.target.value
    });
}

onChangeUnitPrice(e){
    this.setState({
        unit_price :e.target.value
    });
}

onChangeSellingPrice(e){
    this.setState({
        selling_price :e.target.value
    });
}

onSubmit(e){
    e.preventDefault();

    const inventoryItem ={
        item_id:this.state.item_id,
        item_name:this.state.item_name,
        brand_name:this.state.brand_name,
        category:this.state.category,
        unit_price:this.state.unit_price,
        selling_price:this.state.selling_price

    }

    axios.post('http://localhost:5000/inventoryItems/update/'+this.props.editid, inventoryItem)
        .then(res=> this.props.onHide());
   console.log(inventoryItem) 
}

onCancel(){
this.props.onHide() ;
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
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>

<div className="container">


<div className="p-3 border bg-light">

        <form onSubmit={this.onSubmit}>
            <div class="mb-3">
            <label for="item_id" className="form-label">Item ID</label>
            <input type="text" className="form-control" id="item_id" value ={this.state.item_id} onChange={this.onChangeItemID}></input>
            </div>

            <div className="mb-3">
            <label for="item_name" className="form-label">Item Name</label>
            <input type="text" className="form-control" id="item_name" value ={this.state.item_name} onChange={this.onChangeItemName}></input>
            </div>

            <div className="mb-3">
            <label for="brand_name" className="form-label">Brand Name</label>
            <input type="text" className="form-control" id="brand_name" value ={this.state.brand_name} onChange={this.onChangeBrandName}></input>
            </div>

            <div className="row row-cols-3">

            <div className="col">   

            <div className="mb-3">
            <label for="category" className="form-label">Category</label>
            <select className="form-control" aria-label=".form-select-lg example" id="category" value ={this.state.category} onChange={this.onChangeCategory}>          
                <option >Pill</option>
                <option >Liquid</option>
                <option >Cream</option>
            </select>
            </div>
            </div>

            <div className="col">   

            <div className="mb-3">
            <label for="unit_price" className="form-label">Unit Price</label>
            <input type="text" className="form-control" id="unit_price" value ={this.state.unit_price} onChange={this.onChangeUnitPrice}></input>
            </div>
            </div>


             <div className="col">   

            <div className="mb-3">
            <label for="selling_price" className="form-label">Selling Price</label>
            <input type="text" className="form-control" id="selling_price" value ={this.state.selling_price} onChange={this.onChangeSellingPrice}></input>
            </div>
            </div>


            </div>

            <br/>
            <button className="btn btn-secondary" type="button" style={{width: 200 }} onClick={this.onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Update Item</button>
            
        </form>       
        </div>
        </div>   
        </Modal>
 
       )
   } 
}
