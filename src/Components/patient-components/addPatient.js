import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {listDoctor,addDoctor} from '../../store/action/doctor';
import {listPatient } from "../../store/action/patient"

export class AddPatient extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            patient:{
                name: '',
                city: '',
                age: 0,
                
                doctorID: '',
                username: '',
                password: '',
                role: 'PATIENT'  
            },
            errors: {},
            msg: '',
            doctors:[]
        };
      }

    componentDidMount(){
        //fetch all departments: call action
        //this.props.listDoctor();
    }  

    render(){
        return(
            <div>
            <div className="card">
              <h5 className="card-header">Add Patient</h5>
              <div className="card-body">
                <h5 className="card-title">Enter Patient Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label>Patient Name: </label>
                   <input type="text" 
                            name="name"
                            value={this.state.patient.name}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['name']}</span>
                    <br /><br />
                    <label>Patient City: </label>
                    <input type="text" 
                            name="city"
                            value={this.state.patient.city}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['city']}</span>
                    <br /><br />
                    <label>Patient Age: </label>
                    <input type="number" 
                            name="age"
                            value={this.state.patient.age}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['age']}</span>
                    <br /><br />
                    
                    
                    
                    <label>Select Doctor: </label>
                    <select name="doctorID" 
                            value={this.state.patient.doctorID} 
                            onChange={this.changeHandler} > 
                             <option key={0} value="">--Select Doctor--</option>
                        {  this.props.doctor.list.map(d=>(
                           
                            <option key={d.id} value={d.id}>{d.name}</option>
                            
                        ))  }
                         
                    </select>
                    <span style={{ color : 'red'}}>{this.state.errors['doctorId']}</span>
                    <br /><br />
                    
                    <label>Username: </label>
                    <input type="text" 
                            name="username"
                            value={this.state.patient.username}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                            <br /><br />
                    <label>Password: </label>
                    <input type="password" 
                            name="password"
                            value={this.state.patient.password}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                            <br /><br />
                    <button onClick={this.onAdd} className="btn btn-primary">Add Patient</button>
                </p>
                 
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            patient: {
                ...this.state.patient, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.patient);
        /* Call the API */
       this.postPatient(this.state.patient);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let name = this.state.patient.name;
    let city = this.state.patient.city;
    let age = this.state.patient.age;
    
    let doctorId = this.state.patient.doctorID;
    let username = this.state.patient.username;
    let password = this.state.patient.password;
     
    let tempErrors={}
    let formValid = true; 

    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']='Patient Name cannot be empty';
    }
    if(!city){ //If name is not given
        formValid = false;
        tempErrors['city']='Patient city cannot be empty';
    }
    if(!age){ //If name is not given
        formValid = false;
        tempErrors['age']='Patient Age cannot be empty';
    }
    
    if(!doctorId){ //If name is not given
        formValid = false;
        tempErrors['doctorId']='Please select doctor ID';
    }
    if(!username){ //If name is not given
        formValid = false;
        tempErrors['username']='Please enter username';
    }
    if(!password){ //If name is not given
        formValid = false;
        tempErrors['password']='Please enter password';
    }
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postPatient(p){
    let patient = {
        name: p.name,
        city: p.city,
        age: p.age,
        doctorID:p.doctorID,
        user: {
            username: p.username,
            password: p.password,
            role: 'PATIENT'
        }       
    }
    try {
        const response = axios.post("http://localhost:8080/api/patient/add/" + p.doctorID, patient);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Patient Registered"
        })
        this.props.addPatient(data);
      } catch (error) {
        this.setState({
            msg: ''
        })
      }
}
}


function mapStateToProps(state){
    return {
        doctor : []
    }    
}

export default connect(mapStateToProps, {listDoctor,addDoctor})(AddPatient); 