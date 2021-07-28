import React, { Component, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';


const InternalPrescription = props=>(
    <tr>
        <td>{props.internalPrescription.inventoryItem_name}</td>
        <td>{props.internalPrescription.frequency}</td>
        <td>{props.internalPrescription.dose}</td>
        <td>{props.internalPrescription.duration}</td>
        <td>Rs: {props.internalPrescription.price}</td>
        <td>
        <button type="button" class="btn btn-danger" style={{width: 70,marginBottom:5}} onClick={()=>
                {props.onSwitch(props.internalPrescription.inventoryItem_name,
                props.internalPrescription.prescription_id,
                props.internalPrescription.frequency,
                props.internalPrescription.dose,
                props.internalPrescription.duration,
                props.internalPrescription.price,
                )}}
                 >Switch</button>    

        </td>
        {/* <td>{props.inventoryItem.selling_price}</td> */}
    </tr>
)

const ExternalPrescription = pr=>(

    <tr>
        <td>{pr.externalPrescription.inventoryItem_name}</td>
        <td>{pr.externalPrescription.frequency}</td>
        <td>{pr.externalPrescription.dose}</td>
        <td>{pr.externalPrescription.duration}</td>
        <td>Rs: {pr.externalPrescription.price}</td>

        {/* <td>{pr.inventoryItem.selling_price}</td> */}
        <td>
        <button /*disabled={pr.checkLevel(pr.externalPrescription.inventoryItem_name,
                pr.externalPrescription.frequency,
                pr.externalPrescription.dose,
                pr.externalPrescription.duration,
                )=="no"}*/
        /*disabled={pr.removebutton.filter(el=>el.inventoryItem_name==pr.externalPrescription.inventoryItem_name)}*/
    type="button" class="btn btn-danger" style={{width: 70,marginBottom:5}}  onClick={()=>
                 {pr.onSwitch2(pr.externalPrescription.inventoryItem_name,
                    pr.externalPrescription.externalPrescription_id,
                    pr.externalPrescription.frequency,
                    pr.externalPrescription.dose,
                    pr.externalPrescription.duration,
                    pr.externalPrescription.price,
                )}}
                 >Switch</button>    

        </td>
    </tr>
)

class IssueDrugs extends Component {
  constructor(props) {
    super(props);
    
    this.prescriptionList =this.prescriptionList.bind(this);
    this.onChangeNumber =this.onChangeNumber.bind(this);
    this.onClickSearch =this.onClickSearch.bind(this);
    this.externalPrescriptionList =this.externalPrescriptionList.bind(this);
    this.onSwitch =this.onSwitch.bind(this);
    this.onSwitch2 =this.onSwitch2.bind(this);
    this.onChangeTotal =this.onChangeTotal.bind(this);
    this.confirm =this.confirm.bind(this);
    this.checkLevel =this.checkLevel.bind(this);
    this.onconfirmfinish =this.onconfirmfinish.bind(this);
    this.confirmExternalP =this.confirmExternalP.bind(this);



    this.state = {
        confirmunits:0, 
        number:0,
        stockOrder:[],
        assigned_number:0,
        prescriptionID:'',
        prescriptionItems:[],
        externalPrescriptionItems:[],
        patient:[],
        consultID:'',
        total:0,
        consult_charge:0,
        age_now:0,
        nowExternalItem:[],
        times:0,
        anothernowExternalItem:[],
        times2:0,
        consultation:[],
        confirmInternalID:'',
        patient_name:'',
        gender:'',
        stillatDoc:'',
        allnumbers:[],
        currentIndex:0,
        removebutton:[]


    };
  }

  onconfirmfinish(){
    var confirm = new Promise((resolved,reject)=>{
        this.confirm();
        resolved ("done")
    })
    confirm.then(res=>{
        swal("Issue Confirmed", "Search the next patient", "success");
        this.setState({
            number:this.state.allnumbers[this.state.currentIndex+1].assigned_number,
            currentIndex:this.state.currentIndex+1
        },()=>{
            this.onClickSearch();
        })

    })
  }
confirmExternalP(){
    axios.get('http://localhost:5000/externalPrescriptions/getExternalPrescription/'+this.state.consultation._id)
    .then(response1 => {
        console.log("EP:", response1.data)

        
        axios.delete('http://localhost:5000/externalPrescriptionItems/deleteExternalItems/' +response1.data._id)
        .then(response2 => {
            if(this.state.externalPrescriptionItems.length>0){
                for(let j=0;j<this.state.externalPrescriptionItems.length;j++){
                    const InPres={
                      externalPrescription_id:response1.data._id,
                      inventoryItem_name:this.state.externalPrescriptionItems[j].inventoryItem_name,
                      frequency:this.state.externalPrescriptionItems[j].frequency,   
                      dose:this.state.externalPrescriptionItems[j].dose,
                      duration:this.state.externalPrescriptionItems[j].duration,
                      price:this.state.externalPrescriptionItems[j].price
                    }
                    axios.post('http://localhost:5000/externalPrescriptionItems/addExternalPrescriptionItems', InPres)
                    .then(response5=> {
                        
                        console.log(response5.data)});
                  }
                  this.setState({
                    number:this.state.allnumbers[this.state.currentIndex+1].assigned_number,
                    currentIndex:this.state.currentIndex+1
                },()=>{
                    this.onClickSearch();
                })
            }
            else{
                axios.delete('http://localhost:5000/externalPrescriptions/deleteExternalPrescription/' +response1.data._id)
                .then(response4 => {
                    this.setState({
                        number:this.state.allnumbers[this.state.currentIndex+1].assigned_number,
                        currentIndex:this.state.currentIndex+1
                    },()=>{
                        this.onClickSearch();
                    })
                })
            }



        });

    })
    .catch(err=>{
        if(this.state.externalPrescriptionItems.length>0){

            const add ={
                consultation_id:this.state.consultation._id
            }
            axios.post('http://localhost:5000/externalPrescriptions/addExternalPrescription', add)
            .then(resp=> {
                for(let j=0;j<this.state.externalPrescriptionItems.length;j++){
                    const InPres={
                      externalPrescription_id:resp.data,
                      inventoryItem_name:this.state.externalPrescriptionItems[j].inventoryItem_name,
                      frequency:this.state.externalPrescriptionItems[j].frequency,   
                      dose:this.state.externalPrescriptionItems[j].dose,
                      duration:this.state.externalPrescriptionItems[j].duration,
                      price:this.state.externalPrescriptionItems[j].price
                    }
                    axios.post('http://localhost:5000/externalPrescriptionItems/addExternalPrescriptionItems', InPres)
                    .then(resp2=> console.log(resp2.data));
                  }
                  this.setState({
                    number:this.state.allnumbers[this.state.currentIndex+1].assigned_number,
                    currentIndex:this.state.currentIndex+1
                },()=>{
                    this.onClickSearch();
                })
            });

        }
        
    })
}


confirm(){
    console.log("length check:",this.state.prescriptionItems.length)
    axios.get('http://localhost:5000/prescriptions/getPrescription/'+this.state.consultation._id)                
    .then(res1 => {
        console.log("iP:", res1.data)
        this.setState({confirmInternalID:res1.data._id})

        axios.delete('http://localhost:5000/prescriptionItems/deleteItems/' +res1.data._id)
        .then(res2 => {
            console.log("length check:",this.state.prescriptionItems.length)


            if(this.state.prescriptionItems.length>0){
                for(let j=0;j<this.state.prescriptionItems.length;j++){

                    const InPres={
                      prescription_id:res1.data._id,
                      inventoryItem_name:this.state.prescriptionItems[j].inventoryItem_name,
                      frequency:this.state.prescriptionItems[j].frequency,   
                      dose:this.state.prescriptionItems[j].dose,
                      duration:this.state.prescriptionItems[j].duration,
                      price:this.state.prescriptionItems[j].price
                    }
                    axios.post('http://localhost:5000/prescriptionItems/addPrescriptionItems', InPres)
                    .then(res4=> console.log(res4.data));

                    axios.get('http://localhost:5000/inventoryItems/strength/'+ this.state.prescriptionItems[j].inventoryItem_name)
                    .then(ressult1=> {
                        
                        var freq=0;
                        if(this.state.prescriptionItems[j].frequency=="EOD"){freq=0.5;}
                        if(this.state.prescriptionItems[j].frequency=="Manne"||this.state.prescriptionItems[j].frequency=="Daily"||this.state.prescriptionItems[j].frequency=="Noctay"){freq=1;}
                        if(this.state.prescriptionItems[j].frequency=="BD"){freq=2;}
                        if(this.state.prescriptionItems[j].frequency=="TDS"){freq=3;}
                        if(this.state.prescriptionItems[j].frequency=="6 Hourly"){freq=4;}

                        this.setState({
                            confirmunits:Number(freq)*Number(this.state.prescriptionItems[j].dose)*Number(parseInt(this.state.prescriptionItems[j].duration))/Number(ressult1.data)
                        })
                        var conun=this.state.confirmunits;

                        console.log("freq", freq);

                        console.log("units",this.state.confirmunits);
                        
                        axios.get('http://localhost:5000/stocks/orderStocks/'+ this.state.prescriptionItems[j].inventoryItem_name)
                        .then(ressult2=> {
                            this.setState({
                                stockOrder:[],
                                stockOrder:ressult2.data
                            })

                        console.log("stocklist",this.state.stockOrder);
                        console.log("before:",this.state.prescriptionItems);

                        for(let i=0;i<this.state.stockOrder.length;i++){
                            console.log("After:",this.state.prescriptionItems);

                                if(Number(conun)==0){
                                    console.log("break");
                                    break;
                                } 

                                else if(this.state.stockOrder[i].units==0){
                                    console.log("ran");
                                }

                                else if(conun>this.state.stockOrder[i].units){
                                    conun =Number(conun)-Number(this.state.stockOrder[i].units);
                                    axios.post('http://localhost:5000/stocks/reduce/'+this.state.stockOrder[i]._id)
                                    .then(res4=>{
                                    });
                                }
                                   
                                else{
                                    console.log("patrial stock", conun);
                                    const red={
                                        units:conun
                                    }
                                    console.log("inside:", this.state.prescriptionItems);
                                    var thisItem=this.state.prescriptionItems[j].inventoryItem_name

                                    axios.post('http://localhost:5000/stocks/reduceByNum/'+this.state.stockOrder[i]._id,red)
                                    .then(res3=>{
                                        console.log("final:", this.state.prescriptionItems);

                                        
                                        
                                        const item={
                                            item_name:thisItem
                                        }

                                        axios.post('http://localhost:5000/stocks/getstockunits', item)
                                        .then(res4=> {
                                            axios.post('http://localhost:5000/inventoryItems/getItemByVal/'+ thisItem)
                                        .then(res5=> {
                                                if(res4.data<res5.data.reorder_level){
                                                    const not={
                                                        type:"Low Stock",
                                                        not_item:thisItem,
                                                        not_value:res4.data,
                                                    }
                                                    axios.post('http://localhost:5000/notifications/addNot', not)
                                                    .then(res4=> {})

                                                }
                                        })
                                            
                                        });

                                        this.setState({
                                            confirmunits:0
                                        })
                                    })
                                    conun=0;
                                }
                            }
                            
                        })
                    });
                  }
            }
            else{
                console.log("before deleting internal");
                axios.delete('http://localhost:5000/prescriptions/deletePrescription/' +res1.data._id)
                .then(res3 => {console.log(res3.data)})
            }console.log('internal done');

            this.confirmExternalP();
        }); 
    })
    .catch(err=>{console.log(err);})
}

checkLevel(itemname,freq,dose,dur){
   
if(freq=="EOD"){this.setState({times2:0.5})}
if(freq=="Manne"||freq=="Daily"||freq=="Noctay"){this.setState({times2:1})}
if(freq=="BD"){this.setState({times2:2})}
if(freq=="TDS"){this.setState({times2:3})}
if(freq=="6 Hourly"){this.setState({times2:4})}

const check={
    item_name: itemname

  }
  axios.get('http://localhost:5000/inventoryItems/strength/'+itemname)
  .then(res=> {
        // this.setState({
        //     anothernowExternalItem:res.data
        // })
        console.log("stre",res.data);
        console.log("freq",this.state.times2);
        console.log("dose",dose);
        console.log("dur",parseInt(dur));

        var units=Number(dose)*Number(this.state.times2)*Number(parseInt(dur))/Number(res.data);
        console.log("units:", units);

        const check={
            item_name: itemname
        
          }

        axios.post('http://localhost:5000/stocks/getstockunits',check)
        .then(response=>{

        console.log(units,response.data)
            if(units>response.data){ 
                console.log("came here")
             }
            })

        })
        return "no";
}

onSwitch2(itemname,id,freq,dose,dur,price){

if(freq=="EOD"){this.setState({times:0.5})}
if(freq=="Manne"||freq=="Daily"||freq=="Noctay"){this.setState({times:1})}
if(freq=="BD"){this.setState({times:2})}
if(freq=="TDS"){this.setState({times:3})}
if(freq=="6 Hourly"){this.setState({times:4})}

console.log("times:", this.state.times);

const check={
    item_name:itemname
  }
  axios.post('http://localhost:5000/inventoryItems/getItem',check)
  .then(res=> {
      console.log(res.data,this.state.times)
        this.setState({
            nowExternalItem:res.data
        })
        var units=Number(dose)*Number(this.state.times)*Number(parseInt(dur))/Number(res.data.strength);
        console.log("units:", units);

        axios.post('http://localhost:5000/stocks/getstockunits',check)
        .then(response=>{
            if(units>response.data){
                alert("Not Enough Stocks!")
            }else{
                console.log("came to else")
                this.setState({
                    externalPrescriptionItems:this.state.externalPrescriptionItems.filter(el=>el.inventoryItem_name!==itemname)
                })
                this.setState({
                    prescriptionItems: [...this.state.prescriptionItems, ...[
                        {prescription_id:id,
                        inventoryItem_name:itemname, 
                         frequency:freq,
                         dose:dose,
                         duration:dur,
                         price:price
                        }] 
                       ] 
                })
                this.onChangeTotal();
                console.log("internal:",this.state.prescriptionItems)
      console.log("External:",this.state.externalPrescriptionItems)
            }
        })
  })
}
 
onSwitch(itemname,id,freq,dose,dur,price){
this.setState({
    prescriptionItems:this.state.prescriptionItems.filter(el=>el.inventoryItem_name!==itemname),
    externalPrescriptionItems: [...this.state.externalPrescriptionItems, ...[
        {externalPrescription_id:id,
        inventoryItem_name:itemname, 
         frequency:freq,
         dose:dose,
         duration:dur,
         price:price
        }] 
       ] 
},()=>{
    this.onChangeTotal();
    console.log("internal:",this.state.prescriptionItems)
      console.log("External:",this.state.externalPrescriptionItems)
}
)

}

componentDidMount(){
    axios.get('http://localhost:5000/patients/getallNumbers')
    .then(res=>{
console.log(res.data)               
 this.setState({allnumbers:res.data,
     number:res.data[0].assigned_number,
    currentIndex:0})

        this.onClickSearch();
    })
}

onChangeNumber(e){
    this.setState({ 
        number: e.target.value 
    });
}

onChangeTotal() {
if(this.state.prescriptionItems.length>0){
    var x=0;
    for(let i=0;i<this.state.prescriptionItems.length;i++){
            x=x+Number(this.state.prescriptionItems[i].price)
    }
    this.setState({
        total:x+Number(this.state.consult_charge)
    })
}
else{this.setState({
    total:Number(this.state.consult_charge)
})}
} 
  
onClickSearch(){
    this.setState({
        prescriptionItems:[],
        externalPrescriptionItems:[],
        removebutton:[]
    })
    const num={
        assigned_number:this.state.number
    }

    axios.post('http://localhost:5000/patients/getPatiendID',num)
    .then(res1=>{
        this.setState({patient:res1.data,
        patient_name:res1.data.patient_name,
        gender:res1.data.gender
        },()=>{
            var today = new Date();
            var birthDate = new Date(this.state.patient.date_of_birth); 
            this.setState({age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())})
        }
            )
            axios.post('http://localhost:5000/consultations/treatmentConsultation/'+res1.data._id)
            .then(resp1 => {   

                axios.get('http://localhost:5000/checkouts/getcheck/'+resp1.data._id)
                    .then(resp2 => { 
                        if(resp2.data==null){
                            this.setState({stillatDoc:"" }) 
                        }
                        else{
                            this.setState({stillatDoc:"yes"}) 
                        }
                     }).catch(err=>{console.log(err)})

                    axios.get('http://localhost:5000/externalPrescriptions/getExternalPrescription/'+resp1.data._id)
                    .then(response2 => {
                            axios.get('http://localhost:5000/externalPrescriptionItems/getExternalPrescriptionItem/'+response2.data._id)
                            .then(reply2 => {
                                this.setState({
                                externalPrescriptionItems:reply2.data,
                                removebutton:reply2.data
                                })   
                        }).catch(err =>{console.log('Error');})
                    }).catch(err =>{console.log('Error');})
            }).catch(err =>{console.log('Error');})
    }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        this.setState({
            patient:[],
            patient_name:'',
            gender:'',
            age_now:'',
            externalPrescriptionItems:[]
        })
    })
    
        
    axios.post('http://localhost:5000/patients/getPatiendID',num)
    .then(res=>{
            axios.post('http://localhost:5000/consultations/treatmentConsultation/'+res.data._id)
            .then(resp => {
                this.setState({
                    consultation:resp.data,
                    consult_charge:resp.data.consultation_charge
                }) 
                console.log(this.state.consultation);
                 axios.get('http://localhost:5000/prescriptions/getPrescription/'+resp.data._id)
                    .then(response => {
                        axios.get('http://localhost:5000/prescriptionItems/getPrescriptionItem/'+response.data._id)
                        .then(reply => {
                            this.setState({
                                prescriptionItems:reply.data
                        })        
                        this.onChangeTotal();

                        }).catch(err =>{console.log('Error');})
                    }).catch(err =>{console.log('Error');})
            }).catch(err =>{console.log('Error');})
    }).catch(err =>{
        swal("Patient Not Found!", "Try a different number", "error");
        this.setState({
            consultation:[],
            consult_charge:0,
            prescriptionItems:[],
            total:0
        })
    })


}

prescriptionList(){
    if(this.state.prescriptionItems.length>0){
    return this.state.prescriptionItems.map(currentItem =>{
        return<InternalPrescription internalPrescription={currentItem} onChangeTotal={this.onChangeTotal} onSwitch={this.onSwitch} key={currentItem._id}/>;
    })
    }
    else{return ("No Items Available");}
}


externalPrescriptionList(){
    if(this.state.externalPrescriptionItems.length>0){
    return this.state.externalPrescriptionItems.map(itemnow =>{
        return<ExternalPrescription externalPrescription={itemnow} removebutton={this.state.removebutton}  checkLevel={this.checkLevel}
        onSwitch2={this.onSwitch2} key={itemnow._id}/>;
    })
    }
    else{return ("No Items Available");}
}


  render() {

    return (
<div>
<div className="row ">
         <div className="col-1"style={{marginRight:-30,marginLeft:30}}>
             <input className="form-control" type="text" id="assign" style={{height:50,width:70,marginTop:3}} value={this.state.number} onChange={this.onChangeNumber} textAlign={"Center"}></input>
         </div><div className="col-2"style={{/*marginLeft:-300,*/marginTop:8}}>
             <button className="btn btn-warning"style={{width:100}} onClick={this.onClickSearch} >Search</button>
         </div>
         {(this.state.stillatDoc=="yes")
         ?<></>
         :<>
         <div className="col-2" style={{marginTop:15,marginRight:-60,marginLeft:60}}>
             <label ><h5>Total Amount:</h5></label>
         </div>
     
         <div className="col-2" style={{marginTop:8,marginRight:100}}>
         <div class="input-group mb-3" >
         <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Rs.</span></div>
     
             <input type="text" className="form-control"style={{width:150,fontWeight:700}} value={this.state.total} readonly></input>
     </div>
         </div>
     
         <div className="col-3" style={{marginTop:8}}>
             <button className="btn btn-success"style={{width:200}} onClick={this.confirm}>Confirm</button>
         </div></>

         }


         </div>

       
       
       <br/><br/>
<div className="row" >
<div className="col-8" hidden={!this.state.stillatDoc}>

<h5 className="container">Patient have not finished the consultation process!</h5>
</div>

<div className="col-8" hidden={this.state.stillatDoc}>
< div className="p-3 border bg-light" >
<h5>Internal Prescription</h5>
           <table className="table" id="table">
               <tbody>   
                {this.prescriptionList()}
               </tbody>
           </table>
           </div>

<br/>

<div className="p-3 border bg-light" >
<h5>External Prescription</h5>
           <table className="table" id="table2">
               <tbody>
               {this.externalPrescriptionList()}

               </tbody>
           </table>
           </div>

</div>


<div className="col" style={{marginTop:-20,fontSize:17,marginLeft:40}}>
<br/>
Name:
<h4>{this.state.patient_name}</h4>
Gender:
<h5>{this.state.gender}</h5>

Age:
<h5>{this.state.age_now}</h5><br/>


</div>
</div>
      </div>
    );
  }
}

export default IssueDrugs;