import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {listPatientDoctor,addAppointedPatients} from '../../store/action/patientDoctor';

export class AddPatientDoctor extends Component{
    constructor(props) {
        super(props);

        this.state = {
            patientDoctor:{
                appointmentDate:'',
                appointmentTime:'',
                patientId:'',
                doctorId:'',
                hospitalstaffId:''

            },
            errors: {},
            msg: '',
            departments:[]
        };
    }
    
    componentDidMount(){
        //fetch all patientdoctors: call action
        this.props.listPatientDoctor();
    }  

    render(){
        return(
            <div>
            <div className="card">
              <h5 className="card-header">Add patientDoctor</h5>
              <div className="card-body">
                <h5 className="card-title">Enter patientDoctor Info: </h5>
                <p className="card-text">
                
                            <span>{this.state.msg}</span> <br />
                            <label>Appointment Date: </label>
                            <input type="text"
                                name="date"
                                value={this.state.patientDoctor.appointmentDate}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['appointmentDate']}</span>
                            <br /><br />

                            <label>Appointment Time: </label>
                            <input type="text"
                                name="time"
                                value={this.state.patientDoctor.appointmentTime}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['appointmentTime']}</span>
                            <br /><br />

                            <label>Select Patient: </label>
                            <select name="patientId"
                                value={this.state.patientDoctor.patientId}
                                onChange={this.changeHandler} >
                                <option key={0} value="">--Select patient --</option>
                                {this.props.patient.list.map(d => (

                                    <option key={d.id} value={d.id}>{d.name}</option>

                                ))}

                            </select>
                            <span style={{ color: 'red' }}>{this.state.errors['patientId']}</span>
                            <br /><br />

                            <label>Select Doctor: </label>
                            <select name="doctorId"
                                value={this.state.patientDoctor.doctorId}
                                onChange={this.changeHandler} >
                                <option key={0} value="">--Select Doctor --</option>
                                {this.props.doctor.list.map(d => (

                                    <option key={d.id} value={d.id}>{d.name}</option>

                                ))}

                            </select>
                            <span style={{ color: 'red' }}>{this.state.errors['doctorId']}</span>
                            <br /><br />

                            <label>Select HospitalStaff: </label>
                            <select name="hospitalstaffId"
                                value={this.state.patientDoctor.hospitalstaffId}
                                onChange={this.changeHandler} >
                                <option key={0} value="">--Select HospitalStaff --</option>
                                {this.props.hospitalstaff.list.map(d => (

                                    <option key={d.id} value={d.id}>{d.name}</option>

                                ))}

                            </select>
                            <span style={{ color: 'red' }}>{this.state.errors['hospitalstaffId']}</span>
                            <br /><br />
                            <button onClick={this.onAdd} className="btn btn-primary">Add PatientDoctor</button>

                </p>
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            patientDoctor: {
                ...this.state.patientDoctor, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.patientDoctor);
        /* Call the API */
       this.postappointedpatients(this.state.patientDoctor);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let appointmentDate = this.state.patientDoctor.appointmentDate;
    let appointmentTime = this.state.patientDoctor.appointmentTime;
    let patientId = this.state.patientDoctor.patientId;
    let doctorId = this.state.patientDoctor.doctorId;
    let hospitalstaffId = this.state.patientDoctor.hospitalstaffId;

    let tempErrors={}
    let formValid = true; 

    if(!appointmentDate){ //If name is not given
        formValid = false;
        tempErrors['appointmentDate']='Appointment Date cannot be empty';
    }
    if(!appointmentTime){ //If name is not given
        formValid = false;
        tempErrors['appointmentTime']='Appointment Time cannot be empty';
    }

    if(!patientId){ //If name is not given
        formValid = false;
        tempErrors['patientId']='Patient Id cannot be empty';
    }

    if(!doctorId){ //If name is not given
        formValid = false;
        tempErrors['doctorId']='Doctor Id cannot be empty';
    }

    if(!hospitalstaffId){ //If name is not given
        formValid = false;
        tempErrors['hospitalstffId']='HospitalStaff Id cannot be empty';
    }

    this.setState({
        errors: tempErrors
    });

    return formValid; 

}

async postappointedpatients(ap){
    let appointedpatients = {
        appointmentDate:ap.appointmentDate,
        appointmentTime:ap.appointmentTime,
        patientId:ap.patientId,
        doctorId:ap.doctorId,
        hospitalstaffId:ap.hospitalstaffId
    }
    try {
        const response = axios.post("http://localhost:8080/api/patient/doctor/hospitalStaff/appointment/" 
                         + ap.patientId,+ap.doctorId,+ap.hospitalstaffId, appointedpatients);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Appointed Patients Registered"
        })
        this.props.addAppointedPatients(data);
      } catch (error) {
        this.setState({
            msg: 'Operation Failed'
        })
      }
}

}

function mapStateToProps(state) {
    return {
      appointedpatients:[]
    }; 
  }
  
  export default connect(mapStateToProps, {listPatientDoctor})(AddPatientDoctor);