import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import swal from '@sweetalert/with-react';
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import moment  from 'moment';
import { Document } from 'react-pdf'
import image  from '../../assets/login.jpg';
import pdf  from '../../assets/Exposition Issue 16 - Marketing Proposal.pdf';


const Report = (props)=>(
    <tr >
        <td style={{width:150}}><h6>{props.report.report_type}</h6></td>
        <td style={{width:150}}><h6>{props.report.report_date.substring(0,10)}</h6></td>
        <td style={{width:300}}><h6>{props.report.description}</h6></td>
        <a href={"http://localhost:5000/reports/"+props.report.reportfile} target="blank"><h6>Open Report</h6></a>
    </tr>
)

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onUpload =this.onUpload.bind(this);
    this.onChangeFile =this.onChangeFile.bind(this);
    this.onchangetype =this.onchangetype.bind(this);
    this.onChangedate =this.onChangedate.bind(this);
    this.onChangDes =this.onChangDes.bind(this);
    this.reportlist =this.reportlist.bind(this);


    this.state ={
        selectedfile:null,
        report_type:'',
        date:'',
        description:'',
        reports:[]
    }
  }

onUpload(){
    var test = new Promise((resolved,reject)=>{
        const data = new FormData();
        data.append("file",this.state.selectedfile);
        resolved (data)
    })
    test.then(res=>{
        axios.post('http://localhost:5000/reports/uploadReport',res)
        .then(res1=>{
            console.log("test1")
        
            const report={
                patient_id:localStorage.getItem("thisPatient"),
                report_type:this.state.report_type,
                report_date:this.state.date,
                reportfile:res1.data,
                description:this.state.description,
            }
            axios.post('http://localhost:5000/reports/addreport',report)
                .then(res2=>{
                    console.log("test2")
                    console.log(res2.data)})
                .catch(err=>{console.log(err)})
        })

    })


}

onChangeFile(e){
    this.setState({
        selectedfile :e.target.files[0]
    });
}

onchangetype(e){
    this.setState({
        report_type :e.target.value
    });
}

onChangDes(e){
    this.setState({
        description :e.target.value
    });
}

onChangedate(date){
    this.setState({
        date :date
    });
}

componentWillReceiveProps(){
    axios.get('http://localhost:5000/reports/getReport/'+localStorage.getItem("thisPatient"))
        .then(res=>{
            this.setState({
                reports:res.data
            })
            console.log(this.state.reports)
        }).catch(err=>{
            console.log(err)
        })
}

reportlist(){
    return this.state.reports.map(current =>{
        return<Report report={current}  key={current._id}/>;
    })
}


  render() {
    return (
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >        <Modal.Header closeButton >
          <Modal.Title>Reports</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form >
                <br/>
                <div className="p-3 border bg-light">
<div className="row">
<div className="col">
<label className="form-label" >Upload File</label>
<input type="file" className="form-control" name="file" onChange={this.onChangeFile} ></input>
</div>

<div className="col">
<label className="form-label" >Report Type</label>
<input type="text" list="list" className="form-control" onChange={this.onchangetype} ></input>
<datalist id="list">
    <option>FBC</option> 
<option>Liver Profile</option>
<option>FBS</option>
<option>Scr</option>
<option>BU</option>
<option>SE</option>
<option>CRP</option>
<option>Lipid Profile</option>
<option>X-RAY</option>
<option>TSH</option>
<option>ESR</option>
<option>CXR</option>
</datalist>
</div>

<div className="col">
<label className="form-label">Date Taken</label>
<DatePicker
            selected={this.state.date}
            onChange={this.onChangedate}
            className="form-control"
            id="date_of_birth"
            maxDate={moment().toDate()}
            /> 
</div>
</div>

<div className="row">
<div className="col-9">

<label className="form-label" >Description</label>
<textarea className="form-control" value={this.state.description} onChange={this.onChangDes}></textarea>
</div>
<div className="col" style={{marginTop:39}}>
<button  className="btn btn-success" style={{height:50,width:130}} onClick={this.onUpload}>Add</button>


</div>

</div></div>
<br/>

<div className="container">
    <h5>Uploaded Reports</h5>
    <br/>
    
    <table>
        {/* <thead>
            <th>Report Type</th>
            <th>Date Taken</th>
            <th>File</th>


        </thead> */}
    <tbody>
        {this.reportlist()}
    </tbody>

</table></div>

            </form>
                        
        </Modal.Body>
      
        
      </Modal>
    );
  }
}
