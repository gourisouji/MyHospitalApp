export const listPatientDoctor= () => (dispatch) =>{
    fetch('http://localhost:8080/api/patient/doctor/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_PATIENTDOCTOR',payload: data}) )
}

