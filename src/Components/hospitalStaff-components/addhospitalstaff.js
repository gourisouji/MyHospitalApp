import { Component } from "react";
import { connect } from "react-redux";
import { addHospitalStaff } from "../../store/action/listhospitalStaff";
import axios from "axios"


export class AddHospitalStaff extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
            hospitalStaff:{
                name: '',
                contact: '',
                email: '',
                title: '',
                username: '',
                password: '',
                role: 'HOSPITALSTAFF'
            },
            errors: {},
            msg: '',
        };
      }

    componentDidMount(){
        //fetch all departments: call action
        //this.props.listDepartment();
    }  

    render(){
        return(
            <div>
            <div className="card">
              <h5 className="card-header">Add HospitalStaff</h5>
              <div className="card-body">
                <h5 className="card-title">Enter HospitalStaff Info: </h5>
                <p className="card-text">
                <span>{this.state.msg}</span> <br />
                   <label>Name: </label>
                   <input type="text" 
                            name="name"
                            value={this.state.hospitalStaff.name}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['name']}</span>
                    <br /><br />
                    <label>ContactNo: </label>
                    <input type="text" 
                            name="contact"
                            value={this.state.hospitalStaff.contact}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['contact']}</span>
                    <br /><br />
                    <label>EmailId: </label>
                    <input type="text" 
                            name="email"
                            value={this.state.hospitalStaff.email}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['email']}</span>
                    <br /><br />
                    <label>Title: </label>
                    <input type="text" 
                            name="title"
                            value={this.state.hospitalStaff.title}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['title']}</span>
                    <br /><br />
                    <label>Username: </label>
                    <input type="text" 
                            name="username"
                            value={this.state.hospitalStaff.username}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['username']}</span>
                            <br /><br />
                    <label>Password: </label>
                    <input type="password" 
                            name="password"
                            value={this.state.hospitalStaff.password}
                            onChange={this.changeHandler} />
                            <span style={{ color : 'red'}}>{this.state.errors['password']}</span>
                            <br /><br />
                    <button onClick={this.onAdd} className="btn btn-primary">Add</button>
                </p>
                 
              </div>
            </div>
          </div>
        );
    }

    changeHandler= (event) =>{
        this.setState({
            hospitalStaff: {
                ...this.state.hospitalStaff, 
                [event.target.name] : event.target.value
            }
        });
}

onAdd = ()=>{
    /* Validate User inputs */
    if(this.handleValidation()){
        console.log(this.state.hospitalStaff);
        /* Call the API */
       this.postHospitalStaff(this.state.hospitalStaff);
    }
    else{
        /* Display error messages */
        console.log('validation not passed..');     
    }
}

handleValidation(){
    let name = this.state.hospitalStaff.name;
    let contact = this.state.hospitalStaff.contact;
    let email = this.state.hospitalStaff.email;
    let title = this.state.hospitalStaff.title;
    let username = this.state.hospitalStaff.username;
    let password = this.state.hospitalStaff.password;
     
    let tempErrors={}
    let formValid = true; 

    if(!name){ //If name is not given
        formValid = false;
        tempErrors['name']=' Name cannot be empty';
    }
    if(!contact){ //If name is not given
        formValid = false;
        tempErrors['contact']='please enter your contactNo';
    }
    if(!email){ //If name is not given
        formValid = false;
        tempErrors['email']='please enter your EmailId';
    }
    if(!title){ //If name is not given
        formValid = false;
        tempErrors['title']='Title cannot be empty';
    }
    if(!username){ //If name is not given
        formValid = false;
        tempErrors['username']='Please enter your username';
    }
    if(!password){ //If name is not given
        formValid = false;
        tempErrors['password']='Please enter your password';
    }
    this.setState({
        errors: tempErrors
    });

    return formValid; 
}

async postHospitalStaff(hs){
    let hstaff = {
        name: hs.name,
        contact: hs.contact,
        email: hs.email,
        title: hs.title,
        user: {
            username: hs.username,
            password: hs.password,
            role: 'HOSPITALSTAFF'
        }       
    }
    try {
        const response = axios.post("http://localhost:8080/api/hospitalStaff/add", hstaff);
        const data = (await response).data;
        console.log('API success');
        console.log(data);
        this.setState({
            msg: "HospitalStaff Registered"
        })
        this.props.addHospitalStaff(data);
      } catch (error) {
        this.setState({
            msg: ''
        })
      }
}
}
function mapStateToProps(state){
    return {
        
    }    
}

export default connect(mapStateToProps, {addHospitalStaff})(AddHospitalStaff); 


