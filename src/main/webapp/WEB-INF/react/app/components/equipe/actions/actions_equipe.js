import { axiosInstance } from '../../../factories/axios-factory'


export const FETCH_EQUIPES = 'FETCH_USERS';
export const FETCH_EQUIPE  = 'FETCH_USERS';
export const CREATE_EQUIPE = 'CREATE_USER';
export const DELETE_EQUIPE = 'DELETE_USER';
export const UPDATE_EQUIPE = 'UPDATE_USER';
export const SEARCH_EQUIPES = 'SEARCH_USER';
export const FILTER_EQUIPES = 'FILTER_USER';


export function fetchEquipes(){

    const url = '/equipe';

    const response = axiosInstance().get(url);
    return {
        type: FETCH_EQUIPES,
        payload: response
    };
}

export function filterEquipes(equipes, equipe){

    const {name, description} = equipe;

    if(!name && !description){
        return {type: FILTER_EQUIPES, payload: {filteredEquipes:equipes, holdEquipes:equipes}};
    }

    const filteredEquipes = equipes.filter((e) => {
        if(name)
            return (new RegExp(name.toUpperCase())).test(e.name.toUpperCase());
        if(description)
            return (new RegExp(description.toUpperCase())).test(e.description.toUpperCase());
    });

    return {
        type: FILTER_EQUIPES,
        payload: {filteredEquipes, holdEquipes:equipes}
    };
}

export function searchEquipes(equipe){

    const query = Object.keys(equipe).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(equipe[k])
    }).join('&')

    const url = `/equipe/search?${query}`;
    const response = axiosInstance().get(url);
    return {
        type: SEARCH_EQUIPES,
        payload: response
    };
}

export function fetchEquipe(id){
    const url = `/equipe/${id}`;
    const response = axiosInstance().get(url);
    return {
        type: FETCH_EQUIPE,
        payload: response
    };
}

export function createEquipe(equipe){

    var fd = new FormData();

    fd.append('name', equipe.name);
    fd.append('description', equipe.description);
    fd.append('image', equipe.image, 'i.jpg');

    const url = `/equipe`;
    return {
        type: CREATE_EQUIPE,
        payload: axiosInstance().post(url, fd, {headers: { 'content-type': 'multipart/form-data' }})
    };
}

export function deleteEquipe(equipe){
    const url = `/equipe/${equipe.id}`;
    return {
        type: DELETE_EQUIPE,
        payload: {id: equipe.id, response: axiosInstance().delete(url)}
    };
}

export function updateEquipe(equipe){
    const url = `/equipe/${equipe.id}`;
    return {
        type: UPDATE_EQUIPE,
        payload: axiosInstance().put(url, equipe)
    };
}



