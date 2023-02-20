import { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
// import { listHospitalStaff }  from "../../../src/store/action/listhospitalStaff";

export class HospitalStaffList extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
           stafflist:[],
        };
      }
    
      componentDidMount() {
             this.gethospitalstaff();
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
                <th scope="col">EmailId</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.stafflist.map((hs, index)=>(
                  <tr key={hs.id}>
                    <th scope="row" key={hs.id}>{index + 1}</th>
                    <td>{hs.id}</td>
                    <td>{hs.name}</td>
                    <td>{hs.contact}</td>
                    <td>{hs.email}</td>
                    <td>{hs.title}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          )
      }
      async gethospitalstaff(){
        try{
            const response = axios.get("http://localhost:8080/api/hospitalStaff/getall");
            const data= (await response).data;
            this.setState({
                stafflist:data,
            })
        }
        catch(error){
            console.error(error);
        }
    }
}


    