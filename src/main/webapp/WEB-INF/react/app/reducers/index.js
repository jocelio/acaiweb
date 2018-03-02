import { combineReducers } from 'redux';
import EquipeReducer from '../components/equipe/reducers/reducer_equipe';
import PlayerReducer from '../components/player/reducers/reducer_player';
import LoginReducer from '../components/login/redux/reducer_login';
import UserReducer from '../components/user/redux/reducer_user';

import { reducer as reduxForm } from 'redux-form'

const rootReducer = combineReducers({
    state: (state = {}) => state,
    equipesState: EquipeReducer,
    playersState: PlayerReducer,
    loginState: LoginReducer,
    userState: UserReducer,
    form: reduxForm
});

export default rootReducer;
