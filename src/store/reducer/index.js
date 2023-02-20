import { combineReducers } from "@reduxjs/toolkit";
import hospitalStaff from "./hospitalStaff";
import department from "./department";
import departmentdoctor from "./departmentdoctor";
import doctor from "./doctor";
import doctorp from "./doctorp";
import patient from "./patient";
import patientDoctor from "./patientDoctor";
import admittedPatients from "./admittedPatients";
export default combineReducers({hospitalStaff,department,departmentdoctor,doctor,doctorp,patient,patientDoctor,admittedPatients})