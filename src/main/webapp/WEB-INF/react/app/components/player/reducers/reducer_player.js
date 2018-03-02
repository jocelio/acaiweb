import { FETCH_PLAYERS, FETCH_PLAYER, SEARCH_PLAYERS, CREATE_PLAYER, DELETE_PLAYER, FILTER_PLAYERS, UPDATE_PLAYER } from '../actions/actions_player'


export default (state = [], action) => {

    switch (action.type) {
        case FETCH_PLAYERS:
            return {all:action.payload.data}
        case FETCH_PLAYER:
            return {player:action.payload.data}
        case CREATE_PLAYER:
            return action.payload
        case UPDATE_PLAYER:
            return action.payload
        case DELETE_PLAYER:
            return {all: state.all.filter(i => i.id != action.payload.id)}
        case SEARCH_PLAYERS:
            return {all:action.payload.data}
        case FILTER_PLAYERS:
            return {all:action.payload.filteredPlayers, holdPlayers:action.payload.holdPlayers}
        default:
            return state;
    }

};