const initialState= {
    list: []
};

const doctorp = (state =initialState, action)=>{

    //payload object(todo) will get added in list
    if(action.type === 'ADD_DOCTOR'){
        return {...state,  list : [...state.list, action.payload]}
    }
    else
    if(action.type === 'GET_LIST_DOCTOR'){
        return {...state, list: action.payload}
    }
    return state;
};

export default doctorp; 
