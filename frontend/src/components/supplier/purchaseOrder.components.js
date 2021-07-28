import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import swal from '@sweetalert/with-react';



const InventoryItems = pr=>(
    <tr>
        <td>{pr.inventoryItem.item}</td>     
        <td>{pr.inventoryItem.units}</td>     
        <td>
        <button class="btn btn-danger" style={{width: 80}} onClick={()=>{pr.deleteItem(pr.inventoryItem.item)}}>Remove</button>    

            </td>     
    </tr>
)

export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeName =this.onChangeName.bind(this);
    this.onClickadd =this.onClickadd.bind(this);
    this.deleteItem =this.deleteItem.bind(this);
    this.onChangenotes =this.onChangenotes.bind(this);
    this.onChangeUnits =this.onChangeUnits.bind(this);
    this.suggest = this.suggest.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.itemList = this.itemList.bind(this);



    this.state ={
        name:'',
        item:'',
        units:'',
        notes:'',
        items:[],
        supplier:[],
        supplierItems:[],
        purchase_id:'',
        email:''


    }
}

suggest(){
    console.log("here");
    const sup={
        supplier_name:this.state.name
    }
    axios.post('http://localhost:5000/suppliers/getSupplierName',sup)
    .then(response => {                                                                            
        this.setState({
            supplierItems: response.data.supplier_items
        })
        console.log(this.state.supplierItems);
        for(var i=0;i<this.state.supplierItems.length;i++){
            let x = "option" + i;
            x = document.createElement('option');
            x.innerHTML = this.state.supplierItems[i];      
            document.getElementById('list').appendChild(x);
          }
    })
    .catch((error) =>{
        console.log(error);
    })


}

onClickadd(){
    if(this.state.units>0){
this.setState({
items: [...this.state.items, ...[
    {item:this.state.item, 
     units:this.state.units,
   }] 
   ] ,
item:'',
units:''
})}
else{
    swal("Please enter a valid quanitity", "Retry", "error");

}


}

deleteItem(val){
    console.log("works")
this.setState({
    items:this.state.items.filter(el=>el.item!=val)
})
}

componentWillReceiveProps(){
    var date= new Date().toLocaleString();
    axios.get('http://localhost:5000/suppliers/getSupplier')
    .then(response => {                                                                            
        this.setState({
            supplier: response.data
        })
        
    })
    .catch((error) =>{
        console.log(error);
    })

    axios.get('http://localhost:5000/purchases/getnextID')
    .then(response => {
    this.setState({
        purchase_id:'PO-'+date.substring(0,9)+'-'+response.data
    })
})
}

onChangeName(e){
    this.setState({
        name :e.target.value,
        email:this.state.supplier.filter(el=>el.supplier_name==e.target.value)[0].supplier_email
    });
}

onChangeItem(e){
    this.setState({
        item :e.target.value
    });
}

onChangeUnits(e){
    let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({units: amount});
}

onChangenotes(e){
    this.setState({
        notes :e.target.value
    });
    
}


onSubmit(e){
 
    e.preventDefault();
    var notes;
    notes=this.state.notes
    if(notes==''){
        notes="No notes available"
    }

        if(this.state.items.length>0){
            console.log(this.state.items)
    
            var date=new Date();

        const order={
            purchase_id:this.state.purchase_id,
            purchase_date:date.toString().substring(4,15),
            supplier_name:this.state.name,
            supplier_email:this.state.email,
            order_items:this.state.items,
            notes:notes,
        }       
        console.log(order);
        
        axios.post('http://localhost:5000/purchases/addpurchase',order)
          .then(response => {
              console.log(response.data)
              if(response.data.status=="OK"){
                this.setState({
                    supplier_name:'',
                    notes:'',
                    items:[]
                },()=>{
                    this.props.onHide();
                    swal("Order Sent", "The purchase order has been sent to supplier", "success");
                    }
                )
              }
              else{
                swal("Order sedning failed", "Please check the supplier email", "error");

              }
            
            
           })
        }
    
        else{
        swal("No Items Orders!", "Please enter items to be purchased", "error");
        }
    
    

}

onCancel(){
    this.props.onHide();
}

itemList(){
        return this.state.items.map(current =>{
            return<InventoryItems inventoryItem={current} 
            deleteItem={this.deleteItem}
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
          <Modal.Title>Purchase Order</Modal.Title>
        </Modal.Header><br/>
<div className="container">



       
<form onSubmit={this.onSubmit} >
<div className="p-3 border bg-light">

<label for="brand_name" className="form-label">Purchase ID</label>
            <input type="text"list="list" className="form-control" value ={this.state.purchase_id} style={{width:200}}  readOnly ></input>
            <br/>
       
            <label for="item_name" className="form-label">Supplier Name</label>
            <select  aria-label=".form-select-lg example" className="form-control" onBlur={this.suggest} value ={this.state.name} onChange={this.onChangeName} >
            <option selected hidden>Please select a supplier</option>
            {
            this.state.supplier.map(item=>{
                    return<option >{item.supplier_name}</option>})
            }
            </select>
                
            <br/>
<div className="row">
    <div className="col-7">
    <label for="brand_name" className="form-label">Item Name</label>
            <input type="text"list="list" className="form-control" value ={this.state.item}  onChange={this.onChangeItem} ></input>
            <datalist id="list">

            </datalist>
    </div>

    <div className="col-3">
    <label for="brand_name" className="form-label">Units</label>
            <input type="text" className="form-control" id="brand_name" value ={this.state.units} onChange={this.onChangeUnits} ></input>
    </div>

    <div className="col-2" >
    <button type="button" className="btn btn-success" style={{marginTop:30,width:80}} onClick={this.onClickadd} >Add</button>
    </div>
</div>
<br/>
<table className="table" >
               <tbody>
                   {this.itemList()}
               </tbody>

           </table>

            <label for="brand_name" className="form-label">Notes</label>
            <textarea type="text" className="form-control" id="brand_name" value ={this.state.notes} onChange={this.onChangenotes} ></textarea>
            <br/>

            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 
            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Send Order</button>
</div>

     
    </form>  
   </div><br/>
</Modal>


       )
   } 
}
