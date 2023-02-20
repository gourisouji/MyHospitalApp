import { Component } from "react";
import { connect } from "react-redux";
import { AddAdmittedPatients } from "./patientdoctor-components/addAdmittedPatients";
import {listAdmittedPatients} from "../store/action/admittedPatient";
import AdmittedPatientsList from "./patientdoctor-components/admittedpatientsList";

export class AdmittedPatients extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            componentNum: 0
        };
    }

    componentDidMount(){
       //this.props.listAdmittedPatients();
    }

    render(){
        return(
            <div className="container-fliud">
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <button className="list-group-item patientDoctor-sidebar" onClick={() => {
                                    this.setState({ componentNum: 1 })
                                }} >Show all Admitted Patients </button></li>
                            
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        {
                            this.state.componentNum === 1 ?
                                <AddAdmittedPatients admittedpatients={this.props.admittedpatients} /> : <AdmittedPatientsList />}
                    </div>
                </div>
            </div>   
        );
    }

}

function mapStateToProps(state) {
    return {
    admittedpatients: state.admittedpatients
    }; 
  }
  
  export default connect(mapStateToProps, {listAdmittedPatients})(AdmittedPatients);