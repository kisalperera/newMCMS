import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./requestItem.component";


function searchItem(item) {
    return function (e) {
    return e.item_name.toLowerCase().includes(item.toLowerCase()) ||!item;      
    }
}

const InventoryItem = props=>(
    <tr>
        <td>{props.inventoryItem.item_name}</td>
        <td>{props.inventoryItem.category}</td>
        <td>{props.inventoryItem.selling_price}</td>

    </tr>
)

export default class Inventory extends Component {
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.state ={
            inventoryItems:[],
            search:"",
            addModalShow:false,


        };
    }

    onChangeSearch(e) {
        this.setState({
          search: e.target.value
        });
        }

// checkLogin(){
//  if( localStorage.getItem('staff_role')!='Admin'  ){
//         window.location='/login';
//  }
// }

componentDidMount(){
// this.checkLogin();
console.log("role",localStorage.getItem('staff_role'));
axios.get('http://localhost:5000/inventoryItems/')
.then(response => {                                                                            
    this.setState({inventoryItems: response.data})
})
.catch((error) =>{
    console.log(error);
})

}

inventoryItemsList(){
    return this.state.inventoryItems.filter(searchItem(this.state.search)).map(currentinventoryItem =>{
        return<InventoryItem inventoryItem={currentinventoryItem}  key={currentinventoryItem._id}
        
        />;
    })
}




   render(){
    let addModalClose=()=>{this.setState({addModalShow:false});}

       return(
           
       <div>
           <div className="row -md-6">
         <div className="col-10"><input className="form-control me-2" type="search" placeholder="Search Item" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch}  /> </div>

        <div className="col">
        <div className="col"><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}
            }>Request Item</button>
            <AddItem
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
    </div>
    </div>

       </div>
      
<br/>
< div className="p-3 border bg-light" >


           <table className="table" >
               <thead className="thead-light">
                   <tr>
                       <th>Item Name</th>
                       <th>Category</th>
                       <th>Selling Price(Rs)</th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.inventoryItemsList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}

/**/