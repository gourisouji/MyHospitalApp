export const listDoctor= () => (dispatch) =>{
    fetch('http://localhost:8080/api/doctor/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_DOCTOR',payload: data}) )
}

 export  const  addDoctor = (data) => {
     
    return {
        type: 'ADD_DOCTOR',
        payload: data
    }
}