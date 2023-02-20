import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { listAdmittedPatients,addAdmittedPatients } from "../../store/action/admittedPatient";

export class AddAdmittedPatients extends Component{
    constructor(props) {
        super(props);

        this.state = {
            admittedpatients:{
                bedNo:'',
                patientId:'',
                doctorId:'',
                departmentId:''

            },
            errors: {},
            msg: '',
            departments:[]
        };
    }

    componentDidMount(){
        this.props.listAdmittedPatients();
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
                            <label>Bed No </label>
                            <input type="text"
                                name="bedNo"
                                value={this.state.admittedpatients.bedNo}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['bedNo']}</span>
                            <br /><br />
                
                            <label>Select Patient: </label>
                            <select name="patientId"
                                value={this.state.admittedpatients.patientId}
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
                                value={this.state.admittedpatients.doctorId}
                                onChange={this.changeHandler} >
                                <option key={0} value="">--Select Doctor --</option>
                                {this.props.doctor.list.map(d => (

                                    <option key={d.id} value={d.id}>{d.name}</option>

                                ))}

                            </select>
                            <span style={{ color: 'red' }}>{this.state.errors['doctorId']}</span>
                            <br /><br />

                            <label>Select Department: </label>
                            <select name="departmentId"
                                value={this.state.admittedpatients.departmentId}
                                onChange={this.changeHandler} >
                                <option key={0} value="">--Select Department --</option>
                                {this.props.doctor.list.map(d => (

                                    <option key={d.id} value={d.id}>{d.name}</option>

                                ))}

                            </select>
                            <span style={{ color: 'red' }}>{this.state.errors['departmentId']}</span>
                            <br /><br />
                            
                            <button onClick={this.onAdd} className="btn btn-primary">Add AdmittedPatients</button>

                </p>
                </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            admittedpatients: {
                ...this.state.admittedpatients, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.admittedpatients);
        /* Call the API */
       this.postadmittedpatients(this.state.admittedpatients);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let bedNo = this.state.admittedpatients.bedNo;
    let patientId = this.state.admittedpatients.patientId;
    let doctorId = this.state.admittedpatients.doctorId;
    let departmentId=this.state.admittedpatients.departmentId

    let tempErrors={}
    let formValid = true; 

    if(!bedNo){ //If name is not given
        formValid = false;
        tempErrors['bedNo']='Bed No cannot be empty';
    }

    if(!patientId){ //If name is not given
        formValid = false;
        tempErrors['patientId']='Patient Id cannot be empty';
    }

    if(!doctorId){ //If name is not given
        formValid = false;
        tempErrors['doctorId']='Doctor Id cannot be empty';
    }

    if(!departmentId){ //If name is not given
        formValid = false;
        tempErrors['departmentId']='Department Id cannot be empty';
    }

    this.setState({
        errors: tempErrors
    });

    return formValid; 

}

async postadmittedpatients(ap){
    let admittedpatients = {
        bedNo:ap.bedNo,
        patientId:ap.patientId,
        doctorId:ap.doctorId,
        departmentId:ap.departmentId
    }
    try {
        const response = axios.post("http://localhost:8080/api/PatientAdmit/patient/department/doctor/" 
                         + ap.patientId,+ap.doctorId,+ap.departmentId, admittedpatients);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Admitted Patients Registered"
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
      admittedpatients:[]
    }; 
  }
  
  export default connect(mapStateToProps, {listAdmittedPatients})(AddAdmittedPatients);