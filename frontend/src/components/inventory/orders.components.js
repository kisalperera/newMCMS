import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Selected from "./selectedOrder.components";


function searchItem(item) {
    return function (e) {
    return e.purchase_id.toLowerCase().includes(item.toLowerCase()) ||!item;      
    }
}

const Order = props=>(
    <tr>
        <td>{props.order.purchase_id}</td>
        <td>{props.order.supplier_name}</td>
        <td>{props.order.purchase_date}</td>
       <td>{props.order.order_items.length}</td> 
      


        <td>
        <button type="button" class="btn btn-primary" style={{width: 100}} onClick={()=>{props.purchase(props.order._id)}}>Proceed</button>    
        </td>
    </tr>
)

export default class Inventory extends Component {
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.purchase = this.purchase.bind(this);
        this.state ={
            purchaseorders:[],
            search:"",
            addModalShow:false,

        };
    }

onChangeSearch(e) {
this.setState({
  search: e.target.value
});
}

componentDidMount(){

axios.get('http://localhost:5000/purchases/getpurchase')
.then(response => {                                                                            
    this.setState({purchaseorders: response.data})
})
.catch((error) =>{
    console.log(error);
})

}

purchase(id){
    localStorage.setItem("currentOrder",id)
this.setState({
    addModalShow:true,

})
   
}


purchaseordersList(){
    return this.state.purchaseorders.filter(searchItem(this.state.search)).map(currentorder =>{
        return<Order order={currentorder} purchase={this.purchase} key={currentorder._id}/>;
    })
}

   render(){

    let addModalClose=()=>{this.setState({addModalShow:false});
window.location.reload();
}

       return(
        
           
       <div>
           <Selected
        show={this.state.addModalShow}
        onHide={addModalClose}

        />
        
           <div className="row -md-6">
         <div className="col-8" style={{width:969}}><input className="form-control me-2" type="search" placeholder="Search Item" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch}  /> </div>

         
        {/* <div className="col-2"><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}
}>Add Item</button>
     
    </div> */}

       </div>
      
<br/>
< div className="p-3 border bg-light" >


           <table className="table" >
               <thead className="thead-light">
                   <tr>
                       {/* <th>Item ID</th> */}
                       <th>Purchase ID</th>
                       <th>Supplier</th>
                       <th>Order Date</th>
                       <th>Items</th>
                       <th>Actions</th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.purchaseordersList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}

/**/