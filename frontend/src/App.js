import react from 'react';
import{BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarAdmin from "./components/navbar/navbar.components";
import Inventory from "./components/inventory/inventoryItems.components";
import AddItem from "./components/inventory/addItem.components";
import UpdateItem from "./components/inventory/editItem.component";
import PatientsDoc from "./components/patient/patientDoctor.components";
import PatientsRecep from "./components/patient/patientRecep.components";
import AddPatient from "./components/patient/addPatient.component";
import UpdatePatient from "./components/patient/editPatient.components";
import Staff from "./components/staff/staff.components";
import AddStaff from "./components/staff/addStaff.components";
import Login from "./components/login/login.components";
import AddConsultation from "./components/consultation/addConsultation.components"
import Consultation from "./components/consultation/consultations.components"
import DoctorNavbar from "./components/navbar/doctorNavbar.components";
import RecepNavbar from "./components/navbar/recepNavbar.components";
import InventoryDoc from "./components/inventory/inventoryDr.components";
import EditStaff from "./components/staff/editStaff.component";
import ViewConsultation from "./components/consultation/viewConsultation.components";
import ShowConsultation from "./components/consultation/showConsultation.components";
import IssueDrugs from "./components/dispenser/issueDrugs.components"
import DispenserNavbar from "./components/navbar/dispenserNavbar.components";
import Stock from "./components/stocks/stocks.components"
import Checkout from "./components/checkout/checkout.components"
import Request from "./components/inventory/gerRequests.components"
import Supplier from "./components/supplier/supplierlist.component"
import Orders from "./components/inventory/orders.components"
import Notifications from "./components/inventory/notifications.components"
import Schedule from "./components/patient/schedule.components"
import Reports from "./components/reports/reportView.components"
import NewissueDrugs from "./components/dispenser/newIssueDrug.components"
import Admindash from "./components/dashboards/admin.components"
import Recepdash from "./components/dashboards/recep.components"
import DisDash from "./components/dashboards/dispensr.components"
import DocSchedule from "./components/patient/docSchedule.components"




function App() {
  return (
    <Router>
      <div>
      {localStorage.getItem('staff_role')=="Admin"?<NavbarAdmin/>:""  }
      {localStorage.getItem('staff_role')=="Doctor"?<DoctorNavbar/> :"" }
      {localStorage.getItem('staff_role')=="Receptionist"?<RecepNavbar/>  :""}
      {localStorage.getItem('staff_role')=="Dispenser"?<DispenserNavbar/>  :""}

      <br/>
      <div className="container-fluid">

      <Route path="/inventory" exact component = {Inventory}/>
      <Route path="/patientDr" exact component = {PatientsDoc}/>
      <Route path="/patientRc" exact component = {PatientsRecep}/>
      <Route path="/staff" exact component = {Staff}/>
      <Route path="/addItem" component = {AddItem}/>
      <Route path="/edit/:id" component = {UpdateItem}/>
      <Route path="/addPatient" component = {AddPatient}/>
      <Route path="/editPatient/:id" component = {UpdatePatient}/>
      <Route path="/addStaff" component = {AddStaff}/>
      <Route path="/addConsultation/:id" component = {AddConsultation}/>
      <Route path="/consultation/:id" exact component = {Consultation}/>
      <Route path="/login" exact component = {Login}/>
      <Route path="/inventoryDr" exact component = {InventoryDoc}/>
      <Route path="/ediStaff/:id" exact component = {EditStaff}/>
      <Route path="/viewConsultation" exact component = {ViewConsultation}/>
      <Route path="/showConsultation/:id" exact component = {ShowConsultation}/>
      <Route path="/issueDrugs" exact component = {IssueDrugs}/>
      <Route path="/stocks/:value" exact component = {Stock}/>
      <Route path="/checkout" exact component = {Checkout}/>
      <Route path="/request" exact component = {Request}/>
      <Route path="/supplier" exact component = {Supplier}/>
      <Route path="/order" exact component = {Orders}/>
      <Route path="/notifications" exact component = {Notifications}/>
      <Route path="/schedule" exact component = {Schedule}/>
      <Route path="/reports" exact component = {Reports}/>
      <Route path="/newIssue" exact component = {NewissueDrugs}/>
      <Route path="/admindash" exact component = {Admindash}/>
      <Route path="/recepdash" exact component = {Recepdash}/>
      <Route path="/disdash" exact component = {DisDash}/>
      <Route path="/docschedule" exact component = {DocSchedule}/>

      </div>
      </div>
    </Router>
  );
}

export default App;
