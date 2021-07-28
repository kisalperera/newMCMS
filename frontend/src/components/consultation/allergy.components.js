
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";

const Food = pr=>(
    <tr>
        <td><h6>{pr.foodAllergy.allergy_item}</h6></td>     
    </tr>
)

const Drug = pr=>(
  <tr>
      <td><h6>{pr.drugAllergy.allergy_item}</h6></td>     
  </tr>
)

export default class Allergy extends Component {
  constructor(props) {
    super(props);
    this.onChangeAllergyItem = this.onChangeAllergyItem.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.addAllergy = this.addAllergy.bind(this);
    this.getItems = this.getItems.bind(this);
    this.foodAlleryList = this.foodAlleryList.bind(this);
    this.drugAlleryList = this.drugAlleryList.bind(this);
    this.loadData = this.loadData.bind(this);


    this.state ={
        allergy_item:'',
        allergy_type:'',
        items:[],
        length:0,
        foodallery:[],
        drugallergy:[]
    }
  }

  getItems(){
      if(this.state.allergy_type=="Drug Allergy"){
            axios.get('http://localhost:5000/inventoryItems/')
            .then(response => {                                                                       
                this.setState({
                  items: response.data
                })
                axios.get('http://localhost:5000/inventoryItems/itemlength')
                 .then(res=> {
                  this.setState({
                    length: res.data
                  })
                  for(var i=0;i<this.state.length;i++){
                    let x = "option" + i;
                    x = document.createElement('option');
                    x.innerHTML = this.state.items[i].item_name;      
                    document.getElementById('datalistOptions').appendChild(x);
                  }
        
                })
                .catch((error) =>{
                  console.log(error);})
              })
            .catch((error) =>{
                console.log(error);})
      }
      else{
        document.getElementById('datalistOptions').innerHTML="";
          }
  }

  addAllergy(){
const allergy={
	patient_id:localStorage.getItem("thisPatient"),
	allergy_type:this.state.allergy_type,
	allergy_item:this.state.allergy_item
}

if(this.state.allergy_type=="Drug Allergy"){

const check={
  item_name:this.state.allergy_item
}
axios.post('http://localhost:5000/inventoryItems/getItem',check)
     .then(res=> {
      if(res.data.item_name==this.state.allergy_item){

        const allergy={
          patient_id:localStorage.getItem("thisPatient"),
          allergy_type:this.state.allergy_type,
          allergy_item:this.state.allergy_item
        }
        axios.post('http://localhost:5000/allergy/addallergy', allergy)
        .then(resp=> 
            {
                this.setState({
                    allergy_type:'',
                    allergy_item:''
                },()=>{this.loadData();})
            })
      }
      }).catch(err=>{
        swal("Item Not Found!", "Please enter a valid drug item", "error");
        this.setState({
          allergy_type:'',
          allergy_item:''
      })
      })


}
else{
    axios.post('http://localhost:5000/allergy/addallergy', allergy)
    .then(resp=> 
        {
            this.setState({
                allergy_type:'',
                allergy_item:''
            },()=>{this.loadData();})
        })
}
  }

  onChangeAllergyItem(e){
      this.setState({
          allergy_item: e.target.value
      })
  }

  onChangeType(e){
    this.setState({
        allergy_type: e.target.value
    },()=>{this.getItems()})
}

loadData(){

  axios.get('http://localhost:5000/allergy/getDrugallergy/'+	localStorage.getItem("thisPatient"))
  .then(resp=> {
          this.setState({
              drugallergy:resp.data
          })
  }).catch(err=>{console.log(err)})

  axios.get('http://localhost:5000/allergy/getFoodallergy/'+	localStorage.getItem("thisPatient"))
  .then(resp1=> {
          this.setState({
              foodallery:resp1.data
          })
  }).catch(err=>{console.log(err)})
}

componentWillReceiveProps(){
this.loadData();
}

foodAlleryList(){
    if(this.state.foodallery.length>0){
        return this.state.foodallery.map(foodAllergy =>{
            return<Food foodAllergy={foodAllergy} key={foodAllergy._id}/>;
        })
        }          
        else {
          return <h6 style={{color:"black", width:800}}>No Food Allergies Recorded!</h6>;
        }
}

drugAlleryList(){
    if(this.state.drugallergy.length>0){
        return  this.state.drugallergy.map(drugAllergy =>{
            return <Drug drugAllergy={drugAllergy} key={drugAllergy._id}/>;
        })
        }          
        else {
          return <h6 style={{color:"black", width:800}}>No Drug Allergies Recorded!</h6>;
        }
}
render() {


    return (
        <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        
      >        <Modal.Header closeButton >
          <Modal.Title>Allergic History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div >
<div className="p-3 border bg-light">
    <div className="row">
        <div className="col-3">
        <label  className="form-label">Allergy Type</label>
            <select /*onBlur={this.getItems}*/ className="form-control" aria-label=".form-select-lg example" id="table_freq" value={this.state.allergy_type} onChange={this.onChangeType} >
            <option value="" disable selected hidden> </option>
            <option selected>Food Allergy</option>
            <option >Drug Allergy</option>
            </select>
        </div>

        <div className="col-7">
        <label for="table_item" className="form-label">Allergic Item(Food/Drug)</label>
        <input type="text" list="datalistOptions" className="form-control" id="treatment_item"   value ={this.state.allergy_item} onChange={this.onChangeAllergyItem} ></input>
        <datalist id="datalistOptions" style={{width:170}}>
</datalist>
</div>

<div className="col-2" style={{marginTop:30}}>

<button className="btn btn-success" type="button" style={{width:100}} onClick={this.addAllergy}>Add</button> 

</div>

    </div>
</div>
<br/>



<div className="p-3 border bg-light">
<div className="row">
<div className="col-6">
<table>
Drug Allergy<br/><br/>
{this.drugAlleryList()}
{/* {this.props.consultList()} */}
</table>
</div>

<div className="col-6">
<table>
Food Allergy
<br/><br/>
{this.foodAlleryList()}
</table>
</div>

</div>



</div>

     </div>
        </Modal.Body>
      
        
      </Modal>
    );
  }
}

