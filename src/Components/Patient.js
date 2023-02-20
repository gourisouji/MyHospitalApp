import { Component } from "react";
import { connect } from "react-redux";
import { AddPatient } from "./patient-components/addPatient";
import Doctor from "../../src/Components/patient-components/doctor"
import PatientList from "./patient-components/PatientList";
import {listDoctor} from "../store/action/doctor";


export  class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentNum: 0
    };
  }
 
  componentDidMount(){
    this.props.listDoctor();
  }
  render() { 
    return (
      <div className="container-fliud">
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className=" list-group-item"> <button   className="list-group-item patient-sidebar" onClick={()=>{
                this.setState({componentNum : 1})
              }} > Show all Patients </button> </li>
              <li className="list-group-item">
                <button  className=" list-group-item patient-sidebar" 
                onClick={()=>(this.setState({componentNum : 2}))}>
                   Add Doctor</button></li>
                   <li className="list-group-item">
                <button  className=" list-group-item patient-sidebar" 
                onClick={()=>(this.setState({componentNum : 3}))}>
                   Add Patient</button></li>
              
              
            </ul>
          </div>
          <div className="col-lg-9">
              {this.state.componentNum === 1?
                  <PatientList />:this.state.componentNum === 2?
                  <Doctor />:<AddPatient doctor={this.props.doctor} />}
          </div> 
        </div>
      </div>
    );
  }
};
function mapStateToProps(state){
  return {
      doctor : state.doctor
  }    
}
export default connect(mapStateToProps, {listDoctor })(Patient); 

 