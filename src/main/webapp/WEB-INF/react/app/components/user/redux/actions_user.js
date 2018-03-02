import { axiosInstance } from '../../../factories/axios-factory'
import _ from 'lodash'

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER  = 'FETCH_USER';
export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const FILTER_USER = 'FILTER_USER';

export function fetchUsers(){

    const url = '/user';

    const response = axiosInstance().get(url);
    return {
        type: FETCH_USERS,
        payload: response
    };
}

export function filterUsers(users, user){

    const {name, description} = user;

    if(!name && !description){
        return {type: FILTER_USER, payload: {filteredUser:users, holdUser:users}};
    }

    const filteredUser = _.filter(users, e => {
        if(name)
            return (new RegExp(name.toUpperCase())).test(e.name.toUpperCase());
        if(description)
            return (new RegExp(description.toUpperCase())).test(e.description.toUpperCase());
    });

    return {
        type: FILTER_USER,
        payload: {filteredUser, holdUser:users}
    };
}

export function searchUser(user){
    const query = Object.keys(user).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(user[k])
    }).join('&')


    const url = `/user/search?${query}`;
    const response = axiosInstance().get(url);
    return {
        type: SEARCH_USER,
        payload: response
    };
}

export function fetchUser(id){
    const url = `/user/${id}`;
    const response = axiosInstance().get(url);
    return {
        type: FETCH_USER,
        payload: response
    };
}

export function createUser(user){

    var fd = new FormData();

    fd.append('username', user.username);
    fd.append('email', user.email);
    fd.append('password', user.password);
    fd.append('image', user.image, 'i.jpg');


    const url = `/user`;
    return {
        type: CREATE_USER,
        payload: axiosInstance().post(url, fd, {headers: { 'content-type': 'multipart/form-data' }})
    };
}

export function deleteUser(user){
    const url = `/user/${user.id}`;

    return {
        type: DELETE_USER,
        payload: {id: user.id, response:axiosInstance().delete(url)}
    };
}

export function updateUser(user){
    const url = `/user/${user.id}`;
    return {
        type: UPDATE_USER,
        payload: axiosInstance().put(url, user)
    };
}



