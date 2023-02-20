import { Component } from "react";
import { addDepartment } from "../../store/action/department";
import axios from "axios";
import { connect } from "react-redux";

export class AddDepartment extends Component{
    constructor(props){
        super(props);
        this.state={
            department:{
                specialization:''
            },
            errors: {},
            msg: ''
        };
    }
    render(){
       return( 
            <div>
                <div className="card">
                    <h5 className="card-header">Add Department</h5>
                    <div className="card-body">
                        <h5 className="card-title">Enter Department Info: </h5>
                        <p className="card-text">
                            <span>{this.state.msg}</span> <br />
                            <label>Specialization: </label>
                            <input type="text"
                                name="specialization"
                                value={this.state.department.specialization}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['specialization']}</span>
                            <br /><br />
                            <button onClick={this.onAdd}>Add department</button>
                        </p>

                    </div>
                </div>
            </div>
        );

    }
    changeHandler= (event) =>{
        this.setState({
            department: {
                ...this.state.department, 
                [event.target.name] : event.target.value
            }
        });
    }
    onAdd = ()=>{
        /* Validate User inputs */
        if(this.handleValidation()){
            console.log(this.state.department);
            /* Call the API */
           this.postDepartment(this.state.department);
        }
        else{
            /* Display error messages */
            console.log('validation not passed..');     
        }
    }
    handleValidation(){
        let name = this.state.department.specialization;
    
        let tempErrors={}
        let formValid = true; 
        if(!name){ //If name is not given
            formValid = false;
            tempErrors['specialization']='Department Name cannot be empty';
        }
        this.setState({
            errors: tempErrors
        });
    
        return formValid; 
    }
    async postDepartment(department){
        try {
            const response = axios.post("http://localhost:8080/api/department/add",department);
            const data = (await response).data;
            console.log('API success');
            console.log(data);
            this.setState({
                msg: data.msg
            })
    
            //react out to action and update the store
            this.props.addDepartment(data);
          } catch (error) {
             console.log(error)
            //console.error(error.response.data.msg);
            this.setState({
                msg: 'Operation Failed'
            })
          }
    }
    }
    function mapStateToProps(state){
        return {
            departmentList : state.department 
        }    
    
}
export default connect(mapStateToProps, {addDepartment})(AddDepartment);
