import { Component } from "react";
import { connect } from "react-redux";
import {listHospitalStaff } from "../store/action/listhospitalStaff"
import { AddHospitalStaff } from "./hospitalStaff-components/addhospitalstaff";
import { HospitalStaffList } from "./hospitalStaff-components/hospitalstafflist";
export  class HospitalStaff extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        componentNum: 0
      };
    }
   
    componentDidMount(){
    //    this.props.listHospitalStaff();
    }
    render() { 
      return (
        <div className="container-fliud">
          <div className="row">
            <div className="col-sm-3">
              <ul className="list-group">
                <li className=" list-group-item"> <button   className="list-group-item employee-sidebar" onClick={()=>{
                  this.setState({componentNum : 1})
                }} > Show all HospitalStaffList </button> </li>
                <li className="list-group-item">
                  <button  className=" list-group-item employee-sidebar" 
                  onClick={()=>(this.setState({componentNum : 2}))}>
                     Add HospitalStaff</button></li>
              </ul>
              </div>
            <div className="col-lg-9">
                {this.state.componentNum === 1?
                    <HospitalStaffList />:
                    <AddHospitalStaff />}
            </div> 
          </div>
        </div>
        
      );
    }
   
  
     
  };
  
  
  function mapStateToProps(state){
    return {
        listHospitalStaff:state.hospitalStaff
    }    
  }
  
  export default connect(mapStateToProps, {listHospitalStaff })(HospitalStaff); 