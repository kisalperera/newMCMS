import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { jsPDF } from "jspdf";
import swal from '@sweetalert/with-react';
import DatePicker from "react-datepicker";
import moment  from 'moment';
import html2canvas from 'html2canvas';




export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeType =this.onChangeType.bind(this);
    this.onChangeFrom =this.onChangeFrom.bind(this);
    this.onChangeTo =this.onChangeTo.bind(this);
    this.generateReport =this.generateReport.bind(this);
    this.createPDF =this.createPDF.bind(this);


    this.state ={
       type:'',
       from:'',
       to:'',
       incomehide:'',
       activityhide:''
    }
}


generateReport(){

    // html2canvas(document.getElementById('testIframe').contentWindow).then(
    //     function(canvas) {
            var doc = new jsPDF('landscape','pt','a4','false');

            doc.setFontSize(4);
        // const testIframe= document.getElementById("testIframe")
        // const testIframeWindow=  testIframe.contentWindow; 
        
        doc.html(document.querySelector("#one"),{
            "fontSize":20,

            callback:function(pdf){
                pdf.save("in.pdf");
            }
        })


    // });

    
}

createPDF() {
    // get elements of report data
    var report1;
    if(this.state.incomehide==true){
        report1=document.getElementById("report1").innerHTML;
    }
    else{
        report1=document.getElementById("report2").innerHTML;
    }

    var style = "<style>";
    style =
        style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
    style =
        style +
        "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");

    win.document.write("<title>Report 1</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write(report1);
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");

    win.document.close(); // CLOSE THE CURRENT WINDOW.

    win.print(); // PRINT THE CONTENTS.
}

onChangeType(e) {
    this.setState({
      type: e.target.value
    });

    if(e.target.value=="Income Statement"){
        this.setState({
            incomehide:true,
            activityhide:''
        })
    }
    else{
        this.setState({
            activityhide:true,
            incomehide:""
        })
    }
    }
onChangeFrom(date){
        this.setState({
            from :date
        });
      }
onChangeTo(date){
        this.setState({
            to :date
        });
      }



   render(){
       return(

      <div>
<div className="row">
    
<div id="one" className="col-3" style={{marginLeft:30}}>
<label className="form-label">Report Type</label>

<select className="form-control" value={this.state.type} onChange={this.onChangeType}>
    <option selected hidden>--Select Report Type--</option>
    <option >Income Statement</option>
    <option>Activity Report</option>
</select>
</div>

<div className="col-1" style={{marginLeft:50,marginTop:15}}>
<button className="btn btn-success"style={{width: 200,height:50}} onClick={this.createPDF} disabled={!this.state.type}>Generate PDF</button> 
</div>


</div>
<br/><br/>


<div style={{marginTop:0}}>

<div>
<div style={{border:"solid", borderColor:"black"}} id="report1" hidden={!this.state.incomehide}>        
<div className="container">
<iframe  width="1140" height="665" src="https://app.powerbi.com/reportEmbed?reportId=7b2d3abc-4cfe-48f4-9f92-dfd7d0b2cd49&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
</div></div> </div>


<div>
<div style={{border:"solid", borderColor:"black"}} id="report2" hidden={!this.state.activityhide}>        
<div className="container">
<iframe width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=eefdbd79-2763-426f-a33c-85b8893a43ba&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
</div></div> </div>



</div>


</div>     
        )
   } 
}
