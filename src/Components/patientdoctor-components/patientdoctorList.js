import { Component } from "react";
import { connect } from "react-redux";
import { listPatientDoctor } from "../../store/action/patientDoctor";

export class PatientDoctorList extends Component{
    constructor(props) {
        super(props);

        this.state = {

        };
      }

      componentDidMount() {
          this.props.listPatientDoctor();
      }

      render(){
        return(
          
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Patient Doctor ID</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Appointment Time</th>
                  <th scope="col">DoctorName</th>
                  <th scope="col">HospitalStaffName</th>
                  <th scope="col">PatientName</th>

                  
                </tr>
              </thead>
              <tbody>
                {
                  
                  this.props.patientDoctorList.list.map((p, index) => (

                    <tr key={p.id}>
                      <th scope="row" key={p.id}> {index + 1}</th>
                          <td>{p.id}</td>
                          <td>{p.appointmentDate}</td>
                          <td>{p.appointmentTime}</td> 
                          <td>{p.doctor.name}</td>
                          <td>{p.hospitalStaff.name}</td>
                          <td>{p.patient.name}</td>
                          
                    </tr>

                )) 
            }   
              </tbody>
            </table>
          
        );
      }
};

function mapStateToProps(state) {
    return {
      patientDoctorList: state.patientDoctor
    }; 
  }
  
  export default connect(mapStateToProps, {listPatientDoctor})(PatientDoctorList);
