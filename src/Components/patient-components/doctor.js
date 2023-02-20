import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import {addDoctor} from '../../store/action/doctor';

export class Doctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
        doctor:{
            name: '',
            contactNo:'',
            specialization:''
        },
        errors: {},
        msg: ''
    };
  }

  render() {
    return (
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
                <button onClick={this.onAdd}>Add doctor</button>
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
    
    let tempErrors={}
    let formValid = true; 
    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']='Doctor Name cannot be empty';
    }
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postDoctor(doctor){
    try {
        const response = axios.post("http://localhost:8080/api/doctor/add", doctor);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: data.msg
        })
        
        //react out to action and update the store
        this.props.addDoctor(data);
      } catch (error) {
         console.log(error)
        //console.error(error.response.data.msg);
        this.setState({
            msg: 'Operation Failed'
        })
      }
}
}
function mapStateToProps(state){
    return {
         
    }    
}

export default connect(mapStateToProps, {addDoctor})(Doctor); 