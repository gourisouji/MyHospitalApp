import { Component } from "react";
import { connect } from "react-redux";
import { listDoctor } from "../../store/action/doctor";
export class DoctorList extends Component{
    constructor(props) {
        super(props);

        this.state = {

        };
      }

      componentDidMount() {
          this.props.listDoctor();
      }

      render(){
        return(
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">ContactNo</th>
                <th scope="col">Specialization</th>
                
                <th scope="col">Department</th>
                
              </tr>
            </thead>
            <tbody>
              {
                this.props.doctorList.list.map((d, index) => (

                  <tr key={d.id}>
                    <th scope="row" key={d.id}> {index + 1}</th>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.contactNo}</td>
                    <td>{d.specialization}</td>
                    
                    <td>{d.department.specialization}</td>
                  </tr>

              ))}   
            </tbody>
          </table>
          )
      }
}

function mapStateToProps(state) {
    return {
      doctorList: state.doctor
    }; 
  }

  export default connect(mapStateToProps, {listDoctor})(DoctorList);