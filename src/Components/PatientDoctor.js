import { Component } from "react";
import { connect } from "react-redux";
import { listPatientDoctor } from "../store/action/patientDoctor";
import AddPatientDoctor from "./patientdoctor-components/addPatientDoctor"
import PatientDoctorList from "./patientdoctor-components/patientdoctorList";

export class PatientDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
        componentNum: 0
    };
  }

  componentDidMount() {
    this.props.listPatientDoctor();
  }

  render() { 
    return (
      <div className="container-fliud">
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className="list-group-item">
                <button className="list-group-item patientDoctor-sidebar" onClick={() => {
                  this.setState({ componentNum: 1 })
                }} >Show all Appointed Patients </button></li>
              
            </ul>
          </div>
          <div className="col-lg-9">
          {
          this.state.componentNum === 1? 
                <AddPatientDoctor patientDoctor={this.props.patientDoctor}/>: <PatientDoctorList/> }
        </div>
      </div>
      </div>   
    );
  }
};

function mapStateToProps(state) {
  return {
    patientDoctor: state.patientDoctor
  }; 
}

export default connect(mapStateToProps, {listPatientDoctor})(PatientDoctor);