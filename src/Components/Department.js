import { Component } from "react";
import { connect } from "react-redux";
import { listDepartment } from "../store/action/department"
import AddDepartment from "./department-components/addDepartment";
import DepartmentList from "./department-components/departmentList";
export class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentNum:0
    };
  }

  componentDidMount() {
    //  this.props.listDepartment();
  }

  render() { 
    return (
      <div className="container-fliud">
        <div className="row">
          <div className="col-sm-3">
            <ul className="list-group">
              <li className="list-group-item">
                <button   className="list-group-item employee-sidebar" onClick={()=>{
                this.setState({componentNum : 1})}}>Show all Departments</button></li>
              <li className="list-group-item"><button  className=" list-group-item employee-sidebar" 
                onClick={()=>(this.setState({componentNum : 2}))}>Add Department</button></li>
            </ul>
          </div>
          <div className="col-lg-9">
            {this.state.componentNum===1?
            <DepartmentList/>:<AddDepartment/>
            }
            
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    departmentList: state.department
  }; 
}

export default connect(mapStateToProps, {listDepartment})(Department);