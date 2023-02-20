export const listHospitalStaff= () => (dispatch) =>{
    fetch('http://localhost:8080/api/hospitalStaff/getall')
    .then(response=> response.json())
    .then(data=> dispatch({type: 'GET_LIST_HOSPITALSTAFF',payload: data}) )
}

 export  const  addHospitalStaff = (data) => {
     
    return {
        type: 'ADD_HOSPITALSTAFF',
        payload: data
    }
}