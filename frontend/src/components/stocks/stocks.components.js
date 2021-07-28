import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddStock from './addStock.components';


const Stock = props=>(
    <tr>
        <td>{props.stock.stock_id}</td>
        <td>{props.stock.manufacture_date.substring(0,10)}</td>
        <td>{props.stock.expire_date.substring(0,10)}</td>
        <td>{props.stock.dose}</td>
        <td>{props.stock.units}</td>
    </tr>
)

export default class Inventory extends Component {
    constructor(props){
        super(props);
        this.addModal =this.addModal.bind(this);

        this.state ={
            stocks:[],
            addModalShow:false,

        };
    }

addModal(){
    this.setState({
        addModalShow:true
    })
}


componentDidMount(){
    axios.get('http://localhost:5000/stocks/getstock/'+this.props.match.params.value)
.then(response => {                                                                            
    this.setState({stocks: response.data})
})
.catch((error) =>{
    console.log(error);
})

}



stockList(){
    return this.state.stocks.filter(el=>el.units!=0).map(currentStock =>{
        return<Stock stock={currentStock} key={currentStock._id}/>;
    })
}

   render(){
    let addModalClose=()=>{
        this.setState({addModalShow:false})
    }
       return(
           
       <div>
           <div className="row -md-6">

        

       </div>
      
<br/>
< div className="p-3 border-rounded bg-light" >


           <table className="table" >
               <thead className="thead-light">
                   <tr>
                   <th>Stock ID</th>
                       <th>Manufacture Date</th>
                       <th>Expire Date</th>
                       <th>Units </th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.stockList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}

/**/