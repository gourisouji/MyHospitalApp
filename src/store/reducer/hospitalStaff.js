const initialState= {
    list: []
};

const hospitalStaff = (state =initialState, action)=>{

    //payload object(todo) will get added in list
    if(action.type === 'ADD_HOSPITALSTAFF'){
        return {...state,  list : [...state.list, action.payload]}
    }else
    if(action.type === 'GET_LIST_HOSPITALSTAFF'){
        return {...state, list: action.payload}
    }
    return state;
};

export default hospitalStaff; 