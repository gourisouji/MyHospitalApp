export const listAdmittedPatients= () => (dispatch) =>{
    fetch('http://localhost:8080/api/PatientAdmit/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_ADMITTEDPATIENTS',payload: data}) )
}
