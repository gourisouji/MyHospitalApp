const initialState= {
    list: []
};

const patient = (state =initialState, action)=>{

    if(action.type === 'GET_LIST_PATIENT'){
        return {...state, list: action.payload}
    }
    if(action.type === 'ADD_PATIENT'){
        return {...state, list: action.payload}
    }
   

    return state;
};

export default patient; 