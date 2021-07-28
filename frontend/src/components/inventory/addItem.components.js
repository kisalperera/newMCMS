import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import swal from '@sweetalert/with-react';


const Dose = pr=>(
    <tr>
        <td>{pr.dose.dose} {pr.strength_type}</td>     

        <td>
        <button class="btn btn-danger" style={{width: 80}} onclick={()=>{pr.remove(pr.dose.dose)}}>Remove</button>    
        </td>
    </tr>
)


export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeStrength =this.onChangeStrength.bind(this);
    this.onChangeDose =this.onChangeDose.bind(this);
    this.onChangeItemName =this.onChangeItemName.bind(this);
    this.onChangeBrandName =this.onChangeBrandName.bind(this);
    this.onChangeCategory =this.onChangeCategory.bind(this);
    this.onChangeUnitPrice =this.onChangeUnitPrice.bind(this);
    this.onChangeSellingPrice =this.onChangeSellingPrice.bind(this);
    this.onChangeReorder =this.onChangeReorder.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.doseList = this.doseList.bind(this);
    this.onClickadd = this.onClickadd.bind(this);
    this.remove = this.remove.bind(this);



    this.state ={
        item_name:'',
        brand_name:'',
        category:'',
        unit_price:0,
        selling_price:0,
        dose:'',
        strength:'',
        doses:[],
        strength_type:'⮟',
        reorder_level:''

    }
}


remove(d){
    this.setState({
        doses:this.state.doses.filter(el=>el.dose!==d)
    })
}

onClickadd(){

this.setState({
    doses: [...this.state.doses, ...[
        {dose:this.state.dose, 
         }] 
       ] ,

       dose:"",
      
})}



onChangeDose(e){
    this.setState({
        dose :e.target.value
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

onChangeStrength(e){
    let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({strength: amount});
}

onChangeCategory(e){
    this.setState({
        category :e.target.value
    });
    if(e.target.value=="Pill"){this.setState({strength_type:"mg"})}
    if(e.target.value=="Syrup"){this.setState({strength_type:"ml"})}
    if(e.target.value=="Cream"){this.setState({strength_type:"mg"})}
}

onChangeUnitPrice(e){
        let amount = parseFloat(e.target.value);
        if (isNaN(amount) || amount < 0) {amount = 0;}
        this.setState({unit_price: amount});
    
}

onChangeReorder(e){
    let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({reorder_level: amount});
}

onChangeSellingPrice(e){
    let amount = parseFloat(e.target.value);
    if (isNaN(amount) || amount < 0) {amount = 0;}
    this.setState({selling_price: amount});

}

onSubmit(){
console.log(this.state.doses);

    if(this.state.doses==null){
        swal("Please add doses", "You have not entered any doses", "error")
    }
    else{

    const inventoryItem ={
        item_name:this.state.item_name+"-"+this.state.brand_name+"-"+this.state.strength+this.state.strength_type,
        category:this.state.category,
        strength:this.state.strength,
        unit_price:this.state.unit_price,
        selling_price:this.state.selling_price,
        reorder_level:this.state.reorder_level,

    }
    axios.post('http://localhost:5000/inventoryItems/add', inventoryItem)
        .then(res=> {
            if(this.state.doses.length>0){
                for(let i=0;i<this.state.doses.length;i++){
                const dos={
                    item_name:this.state.item_name+"-"+this.state.brand_name+"-"+this.state.strength+this.state.strength_type,
                    dose:this.state.doses[i].dose,
                }
                axios.post('http://localhost:5000/inventoryDoses/addDose', dos)
                        .then(res=> {
                            this.props.onHide();
                        });
                }
                }else{this.props.onHide();}

        });
        


    }
}

onCancel(){
    this.props.onHide();
}

doseList(){
        return this.state.doses.map(currentDose =>{
            return<Dose dose={currentDose} strength_type={this.state.strength_type} remove={this.remove} key={currentDose._id}/>;
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
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
<div className="container">


<div className="p-3 border bg-light">

       
<form onSubmit={this.onSubmit} >
       
            <div className="mb-3">
            <label for="item_name" className="form-label">Item Name</label>
            <input type="text" className="form-control" id="item_name" value ={this.state.item_name} onChange={this.onChangeItemName} required></input>
            </div>

            <div className="mb-3">
            <label for="brand_name" className="form-label">Brand Name</label>
            <input type="text" className="form-control" id="brand_name" value ={this.state.brand_name} onChange={this.onChangeBrandName} required></input>
            </div>


            <div className="row row-cols-3">

             <div className="col-5">   
            <label for="category" className="form-label">Category</label>
            <select className="form-control" aria-label=".form-select-lg example" id="category" value ={this.state.category} onChange={this.onChangeCategory} required>
            <option selected>Select Category</option>
            <option >Pill</option>
            <option >Syrup</option>
            <option >Cream</option>
            </select>
            </div>

            <div className="col-5" style={{marginLeft:30}}>   
            <label for="brand_name" className="form-label">Strength</label>
            <div class="input-group mb-3" >
            <input type="text" className="form-control" id="brand_name" value ={this.state.strength} onChange={this.onChangeStrength}required ></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">{this.state.strength_type}</span></div>

            </div>
            </div></div>

            <div className="row">

            <div className="col-3"> 
            <label  className="form-label">Unit Price</label>

            <div class="input-group mb-3" >

            <input type="text" className="form-control"  value ={this.state.unit_price} onChange={this.onChangeUnitPrice} required></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs</span></div>
</div>
            </div>

            <div className="col-3"style={{marginLeft:60}}> 
            <label  className="form-label">Selling Price</label>

            <div class="input-group mb-3" >

            <input type="text" className="form-control" value ={this.state.selling_price} onChange={this.onChangeSellingPrice} required></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs</span></div>
</div>
            </div>

            <div className="col-3"style={{marginLeft:60}}> 
            <label  className="form-label">Reorder Level</label>
            <input type="text" className="form-control" value ={this.state.reorder_level} onChange={this.onChangeReorder} required></input>
</div>
            </div>
           
            
            <br/>


            <div className="row">

            <div className="col-4"> 
            
            <label  className="form-label">Dose</label>
            <div class="input-group mb-3" >
            <input type="text" className="form-control" id="brand_name" value ={this.state.dose} onChange={this.onChangeDose} ></input>
            <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">{this.state.strength_type}</span></div>

            </div>
                </div>


            

            <div className="col-3" style={{marginLeft:10}}> 
            <button type="button" className="btn btn-success" style={{marginTop:30}} onClick={this.onClickadd} >Add Dose</button>
            </div>

        </div>

            <table className="table"  >
               <tbody >
                   {this.doseList()}
               </tbody>

           </table><br/>

           
            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 


            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Add Item</button>

            
    </form>  
     </div>
   </div>
</Modal>


       )
   } 
}

 