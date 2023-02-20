import { Component } from "react";
import { connect } from "react-redux";
import { listAdmittedPatients } from "../../store/action/admittedPatient";

export class AdmittedPatientsList extends Component{
    constructor(props) {
        super(props);

        this.state = {

        };
      }

      componentDidMount() {
          this.props.listAdmittedPatients();
      }

      render(){
        return(
          
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Admitted Patients ID</th>
                  <th scope="col">DepartmentName</th>
                  <th scope="col">DoctorName</th>
                  <th scope="col">PatientName</th>
                  <th scope="col">Bed No</th> 
                </tr>
              </thead>
              <tbody>
                {
                  
                  this.props.admittedPatientList.list.map((p, index) => (

                    <tr key={p.id}>
                      <th scope="row" key={p.id}> {index + 1}</th>
                          <td>{p.id}</td>
                          <td>{p.department.specialization}</td> 
                          <td>{p.doctor.name}</td>
                          <td>{p.patient.name}</td>
                          <td>{p.bedNo}</td>
                          
                    </tr>

                )) 
            }   
              </tbody>
            </table>
          
        );
      }
}

function mapStateToProps(state) {
    return {
      admittedPatientList: state.admittedPatients
    }; 
  }
  
  export default connect(mapStateToProps, {listAdmittedPatients})(AdmittedPatientsList);
