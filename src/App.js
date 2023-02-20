import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Routes } from "react-router-dom";
import './App.css';


import Logout from './Components/auth/logout';
import { Component } from 'react';
import NavBar from './Components/navbar';
import { HospitalStaff } from './Components/hospitalStaff';
import Department from './Components/Department';
import Doctor from './Components/Doctor';
import Login from './Components/auth/login';
import Patient from './Components/Patient';
import PatientDoctor from './Components/PatientDoctor';
import { AdmittedPatients } from './Components/admittedpatients';
import SignUp from './Components/SignUp';
// import SignUp from './Components/SignUp';
// import PageNotFound from './Components/PageNotFound';

export default class App extends Component {
  render(){
  return (
    <div >
      <Provider store={store}> 
        <NavBar/>
        <Routes>
        
        {/* <Route path="/" element={<HospitalStaff />} /> */}
        <Route path="/" element={ <Login />} />
        <Route path="/logout" element={ <Logout />} />
        <Route path="/hospitalStaff" element={<HospitalStaff />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/patients" element={<Patient />} /> 
        <Route path="/appointments" element={<PatientDoctor/>}/>
        <Route path="/admittedpatients" element={<AdmittedPatients/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
          
        </Routes>
        </Provider>
    </div>
    )
}
}

