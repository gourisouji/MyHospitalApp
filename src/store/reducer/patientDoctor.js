const initialState= {
    list: []
};

const patientDoctor = (state =initialState, action)=>{

    if(action.type === 'GET_LIST_PATIENTDOCTOR'){
        return {...state, list: action.payload}
    }
    
    return state;
};

export default patientDoctor; 