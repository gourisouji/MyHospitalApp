export const listDepartment= () => (dispatch) =>{
    fetch('http://localhost:8080/api/department/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_DEPARTMENT',payload: data}) )
}
export   const  addDepartment = (data) => {

    return {
        type: 'ADD_DEPARTMENT',
        payload: data
    }
}