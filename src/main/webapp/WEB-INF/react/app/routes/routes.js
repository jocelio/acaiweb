import React from 'react';
import {Route, IndexRoute, hashHistory} from 'react-router';
import { isLoggedIn } from './../components/login/redux/actions_login';

import App from '../containers/App';
import Home from '../containers/Home';
import Inbox from '../containers/Inbox';
import Equipe from '../components/equipe/Equipe';
import EquipeNew from '../components/equipe/EquipeNew';
import EquipeUpdate from '../components/equipe/EquipeUpdate';
import EquipeSearch from '../components/equipe/EquipeSearch';

import Player from '../components/player/Player';
import PlayerNew from '../components/player/PlayerNew';
import PlayerUpdate from '../components/player/PlayerUpdate';
import PlayerSearch from '../components/player/PlayerSearch';

import User from '../components/user/User';
import UserNew from '../components/user/UserNew';
import UserUpdate from '../components/user/UserUpdate';
import UserSearch from '../components/user/UserSearch';

import LoginForm from '../components/login/components/LoginForm'


export default
    <Route path="/" component={props => protectedRoute(props, App)} title="Web">
        <Route path="/home" component={Home}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/inbox" component={Inbox}/>
        <Route path="/equipe" component={Equipe}>
            <IndexRoute component={EquipeSearch}/>
            <Route path="new" component={EquipeNew}/>
            <Route path="update/:id" component={EquipeUpdate}/>
        </Route>
        <Route path="/player" component={Player}>
            <IndexRoute component={PlayerSearch}/>
            <Route path="new" component={PlayerNew}/>
            <Route path="update/:id" component={PlayerUpdate}/>
        </Route>
        <Route path="/user" component={User}>
            <IndexRoute component={UserSearch}/>
            <Route path="new" component={UserNew}/>
            <Route path="update/:id" component={UserUpdate}/>
        </Route>
    </Route>

const protectedRoute = (props, Component, ...rest) => (<Component {...props} {...rest}/>)