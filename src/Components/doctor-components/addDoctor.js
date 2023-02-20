import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {listDepartment,addDepartment} from '../../store/action/department';

export class AddDoctor extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            doctor:{
                name: '',
                contactNo: '',
                specialization: '',
               
                departmentID: '',
                username: '',
                password: '',
                role: 'DOCTOR'  
            },
            errors: {},
            msg: '',
            departments:[]
        };
      }

    componentDidMount(){
        //fetch all departments: call action
        //this.props.listDepartment();
    }  

    render(){
        return(
            <div>
            <div className="card">
              <h5 className="card-header">Add Doctor</h5>
              <div className="card-body">
                <h5 className="card-title">Enter Doctor Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label>Doctor Name: </label>
                   <input type="text" 
                            name="name"
                            value={this.state.doctor.name}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['name']}</span>
                    <br /><br />
                    <label>Doctor ContactNo: </label>
                    <input type="text" 
                            name="contactNo"
                            value={this.state.doctor.contactNo}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['contactNo']}</span>
                    <br /><br />
                    <label>Doctor Specialization: </label>
                    <input type="text" 
                            name="specialization"
                            value={this.state.doctor.specialization}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['specialization']}</span>
                    <br /><br />
                   
                    
                    
                     <label>Select Department: </label>
                    <select name="departmentID" 
                            value={this.state.doctor.departmentID} 
                            onChange={this.changeHandler} > 
                             <option key={0} value="">--Select Department--</option>
                        {  this.props.dept.list.map(d=>(
                           
                            <option key={d.id} value={d.id}>{d.specialization}</option>
                            
                        ))  }
                         
                    </select>
                    <span style={{ color : 'red'}}>{this.state.errors['departmentId']}</span>
                    <br /><br />
                     
                    <label>Username: </label>
                    <input type="text" 
                            name="username"
                            value={this.state.doctor.username}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                            <br /><br />
                    <label>Password: </label>
                    <input type="password" 
                            name="password"
                            value={this.state.doctor.password}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                            <br /><br />
                    <button onClick={this.onAdd} className="btn btn-primary">Add Doctor</button>
                </p>
                 
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            doctor: {
                ...this.state.doctor, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.doctor);
        /* Call the API */
       this.postDoctor(this.state.doctor);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let name = this.state.doctor.name;
    let contactNo = this.state.doctor.contactNo;
    let specialization= this.state.doctor.specialization;
   
    let departmentId = this.state.doctor.departmentID;
    let username = this.state.doctor.username;
    let password = this.state.doctor.password;
     
    let tempErrors={}
    let formValid = true; 

    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']='Doctor Name cannot be empty';
    }
    if(!contactNo){ //If name is not given
        formValid = false;
        tempErrors['contactNo']='Doctor contactNo cannot be empty';
    }
    if(!specialization){ //If name is not given
        formValid = false;
        tempErrors['specialization']='Doctor Specialization cannot be empty';
    }
    
    if(!departmentId){ //If name is not given
        formValid = false;
        tempErrors['departmentId']='Please select department ID';
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

async postDoctor(e){
    let doc = {
        name: e.name,
        contactNo: e.contactNo,
        specialization: e.specialization,
        
        user: {
            username: e.username,
            password: e.password,
            role: 'DOCTOR'
        }       
    }
    try {
        const response = axios.post("http://localhost:8080/api/doctor/add/" + e.departmentID, doc);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "Doctor Registered"
        })
        this.props.addDoctor(data);
      } catch (error) {
        this.setState({
            msg: 'Operation Failed'
        })
      }
}
}


function mapStateToProps(state){
    return {
        dept : []
    }    
}

export default connect(mapStateToProps, {listDepartment,addDepartment})(AddDoctor);