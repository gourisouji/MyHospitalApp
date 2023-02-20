import { Component } from "react";
import { connect } from "react-redux";
import { listDepartment } from "../../store/action/department";

export class DepartmentList extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
        
        };
      }
    
      componentDidMount() {
         this.props.listDepartment();
      }
    
      render() { 
        return (
          
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">ID</th>
                      <th scope="col">Specialization</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.departmentList.list.map((e, index) => (
    
                        <tr key={e.id}>
                          <th scope="row" key={e.id}> {index + 1}</th>
                          <td>{e.id}</td>
                          <td>{e.specialization}</td>
                          
                        </tr>
    
                    ))}   
                  </tbody>
                </table>
        )
      }
    };
    
    function mapStateToProps(state) {
      return {
        departmentList: state.department
      }; 
    }
    
    export default connect(mapStateToProps, {listDepartment})(DepartmentList);

