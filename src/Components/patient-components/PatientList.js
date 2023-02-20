import { Component } from "react";
import { connect } from "react-redux";
import { listPatient } from "../../store/action/patient";
export class PatientList extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          
        };
      }
    
      componentDidMount() {
          this.props.listPatient();
      }

      render(){
        return(
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Age</th>
                
                <th scope="col">Doctor</th>
                
              </tr>
            </thead>
            <tbody>
              {
                this.props.patientList.list.map((p, index) => (
                 
                  <tr key={p.id}>
                    <th scope="row" key={p.id}> {index + 1}</th>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.city}</td>
                    <td>{p.age}</td>
                    
                    <td>{p.doctor.name}</td>
                    {/* <td> 
                      {p.projects.map(p=> (
                          <li key={index}>
                              {p.title} 
                          </li>
                      ))}
                    </td> */}
                  </tr>
                
              ))}   
            </tbody>
          </table>
          )
      }
}

function mapStateToProps(state) {
    return {
      patientList: state.patient
    }; 
  }
  
  export default connect(mapStateToProps, {listPatient})(PatientList);