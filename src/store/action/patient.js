export const listPatient= () => (dispatch) =>{
    fetch('http://localhost:8080/api/patient/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_PATIENT',payload: data}) )
}
export const addPatient = (data) => {
    return{
        type:'ADD_PATIENT',
        patload:data
    }
}
