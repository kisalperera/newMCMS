import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddSupplier from "./addsupplier.components";
import Order from "./purchaseOrder.components";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



function searchItem(supplier) {
    return function (e) {
    return e.supplier_name.toLowerCase().includes(supplier.toLowerCase()) ||!supplier;      
    }
}

const Supplier = props=>(

    <tr>
        <td >{props.supplier.supplier_name}</td>
        <td >{props.supplier.supplier_email}</td>
        <td >{props.supplier.supplier_phone}</td>
        <td >{props.supplier.supplier_address}</td>
        <td >{props.supplier.supplier_items.length}</td>


        <td><button type="button" class="btn btn-warning" style={{width: 70}}>Order</button>
              |
        <button type="button" class="btn btn-success" style={{width: 70}} >Edit</button>
             
        </td>
    </tr>
)

export default class Inventory extends Component {

    
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.supplierList = this.supplierList.bind(this);


        this.state ={
            inventoryItems:[],
            search:"",
            addModalShow:false,
            addOrderShow:false,
            supplier:[]

        };
    }

    

onChangeSearch(e) {
this.setState({
  search: e.target.value
});
}

componentDidMount(){
axios.get('http://localhost:5000/suppliers/getSupplier')
.then(response => {                                                                            
    this.setState({supplier: response.data})
    console.log(this.state.supplier)
})
.catch((error) =>{
    console.log(error);
})

}



supplierList(){
    return this.state.supplier.filter(searchItem(this.state.search)).map(current =>{
        return<Supplier supplier={current}  key={current._id}/>;
    })
}

   render(){


    let addModalClose=()=>{this.setState({addModalShow:false});}
    let addorderClose=()=>{this.setState({addOrderShow:false});}


       return(
           
       <div>
           <div className="row -md-6">
         <div className="col-8"><input className="form-control me-2" type="search" placeholder="Search Item" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch}  /> </div>

         <div className="col-2" style={{marginLeft:50}}><button type="button" className="btn btn-warning"  onClick={()=>{this.setState({addOrderShow:true})}
}>Send Order</button>
<Order
         show={this.state.addOrderShow}
         onHide={addorderClose}
         />
</div>

        <div className="col-2" style={{marginLeft:-60}}><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}
}>Add Supplier</button>
      <AddSupplier
         show={this.state.addModalShow}
         onHide={addModalClose}
         />
    </div>

       </div>
      
<br/>
< div className="p-3 border bg-light" >



           <table className="table" >
               <thead className="thead-light">
                   <tr>
                       {/* <th>Item ID</th> */}
                       <th>Supplier Name</th>
                       <th>Email</th>
                       <th>Contact No</th>
                       <th>Address</th>
                        <th>No of Items</th>
                       <th>Actions </th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.supplierList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}
