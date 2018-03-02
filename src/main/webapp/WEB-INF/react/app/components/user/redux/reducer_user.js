import { FETCH_USERS, FETCH_USER, SEARCH_USER, CREATE_USER, DELETE_USER, FILTER_USER, UPDATE_USER } from './actions_user'


export default (state = [], action) => {
console.log(action)
    switch (action.type) {
        case FETCH_USERS:
            return {...state, all:action.payload.data}
        case FETCH_USER:
            console.log(action.payload.data)
            return {...state, user:action.payload.data}
        case CREATE_USER:
            return {...state, newUser: action.payload}
        case UPDATE_USER:
            return {...state, updatedUser:action.payload}
        case DELETE_USER:
            return {...state, all: state.all.filter(i => i.id != action.payload.id)}
        case SEARCH_USER:
            return {...state, all:action.payload.data}
        case FILTER_USER:
            return {...state, all:action.payload.filteredUsers, holdUsers:action.payload.holdUsers}
        default:
            return state;
    }

};