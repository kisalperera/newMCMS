import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import swal from '@sweetalert/with-react';


function searchItem(item) {
    return function (e) {
    return e.item_name.toLowerCase().includes(item.toLowerCase()) ||!item;      
    }
}

const InventoryItems = pr=>(
    <tr>
        <td><input class="form-check-input" type="checkbox" checked={pr.checkitems.includes(pr.inventoryItem.item_name)} value={pr.inventoryItem.item_name} onClick={pr.onChangeCheck} /></td>     
        <td>{pr.inventoryItem.item_name}</td>     
        <td>{pr.inventoryItem.category}</td>             
    </tr>
)


export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeName =this.onChangeName.bind(this);
    this.onChangeEmail =this.onChangeEmail.bind(this);
    this.onChangeAddress =this.onChangeAddress.bind(this);
    this.onChangePhone =this.onChangePhone.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);


    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.itemList = this.itemList.bind(this);



    this.state ={
        name:'',
        email:'',
        phone:'',
        address:'',
        inventoryItems:[],
        search:"",
        checkitems:[]
        

    }
}

onChangeCheck(e){
    var item=""
    item = this.state.checkitems.filter(el=>el==e.target.value);

    if(item==""){
        this.setState({
            checkitems: this.state.checkitems.concat(e.target.value)
          },()=>{console.log(this.state.checkitems)})
    }
    else{
        this.setState({
            checkitems: this.state.checkitems.filter(el=>el!=e.target.value)
          },()=>{console.log(this.state.checkitems)})
    }
}

componentDidMount(){
    axios.get('http://localhost:5000/inventoryItems/')
.then(response => {                                                                            
    this.setState({inventoryItems: response.data})
})
.catch((error) =>{
    console.log(error);
})
}

onChangeSearch(e) {
    this.setState({
      search: e.target.value
    });
    }

onChangeName(e){
    this.setState({
        name :e.target.value
    });
}

onChangeEmail(e){
    this.setState({
        email :e.target.value
    });
}

onChangePhone(e){
//     let amount = parseFloat(e.target.value);
//   if (isNaN(amount) || amount < 0) {amount = "";}

//   const amount = e.target.value.replace(/\+|-/ig, '');
// (e.target.validity.valid) 

   this.setState({phone: e.target.value})
// :this.setState({phone:this.state.phone})

}

onChangeAddress(e){
    this.setState({
        address :e.target.value
    });
    
}


onSubmit(e){
    e.preventDefault();
if(this.state.checkitems.length>0){
    const supp={
        supplier_name:this.state.name,
        supplier_email:this.state.email,
        supplier_phone:this.state.phone,
        supplier_address:this.state.address,
        supplier_items:this.state.checkitems,
    }
    axios.post('http://localhost:5000/suppliers/addSupplier',supp)
      .then(response => {
         this.props.onHide();
         swal("Supplier Added", "Purchase orders are enable for this supplier", "success");
window.location.reload();


       })

}

else{
    swal("No Items Selected!", "Please select at least one item to proceed", "error");

}

}

onCancel(){
    this.props.onHide();
}

itemList(){
        return this.state.inventoryItems.filter(searchItem(this.state.search)).map(current =>{
            return<InventoryItems inventoryItem={current} 
            checkitems={this.state.checkitems} onChangeCheck={this.onChangeCheck}
            key={current._id}/>;
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
          <Modal.Title>Add Supplier</Modal.Title>
        </Modal.Header><br/>
<div className="container">



       
<form onSubmit={this.onSubmit} >
<div className="p-3 border bg-light">

       
            <label for="item_name" className="form-label">Name</label>
            <input type="text" className="form-control" id="item_name" value ={this.state.name} onChange={this.onChangeName} required ></input>
            <br/>

            <label for="brand_name" className="form-label">Email</label>
            <input type="email" className="form-control" id="brand_name" value ={this.state.email} onChange={this.onChangeEmail} required></input>
            <br/>
            {/* pattern="[0-9]*" */}
            <label for="brand_name" className="form-label">Phone No</label>
            <input type="text"   maxLength="10" minLength="10" className="form-control" id="brand_name" value ={this.state.phone} onChange={this.onChangePhone} required ></input>
            <br/>

            <label for="brand_name" className="form-label">Address</label>
            <textarea type="text" className="form-control" id="brand_name" value ={this.state.address} onChange={this.onChangeAddress}required ></textarea>
            <br/>

</div>
<br/>
<div className="p-3 border bg-light">


            <label for="brand_name" className="form-label">Select Items</label>
            <input className="form-control me-2" type="search" placeholder="Search Item" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch}  /> 
            <br/>
            <table className="table" >
               <tbody>
                   {this.itemList()}
               </tbody>

           </table>
           <br/>

           
            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 


            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Add Supplier</button>

            </div>
     
    </form>  
   </div><br/>
</Modal>


       )
   } 
}
