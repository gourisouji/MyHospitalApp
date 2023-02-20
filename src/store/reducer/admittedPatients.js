const initialState= {
    list: []
};

const admittedPatients = (state =initialState, action)=>{

    if(action.type === 'GET_LIST_ADMITTEDPATIENTS'){
        return {...state, list: action.payload}
    }
    
    return state;
};

export default admittedPatients; 