import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login , storeAuthCredentials, redirectIn } from '../redux/actions_login';
import { styles } from '../../../../../../../resources/static/css/login.css'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {showMessageDialog:false, message:''}
    }

    handleLogin(){

        const {email, password} = this.refs;

        this.props.login({username: email.value, password:password.value}).then(response => {

            if(response.error) throw response.data;

            this.props.storeAuthCredentials(response.payload.data);
            this.props.redirectIn()

        }).catch(() => {
            const message = <span className='error-message'>Wrong e-mail or password.</span>
            this.setState({showMessageDialog: true, message:message});
        });

    }

    render(){
        return (
            <MuiThemeProvider>
            <div className="mdl-layout mdl-js-layout mdl-color--grey-100">

            <main className="mdl-layout__content">
                <div className="mdl-card mdl-shadow--6dp">
                    <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                        <h2 className="mdl-card__title-text">Login</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <form action="/oauth/token" id="login" method="post">

                            <div className="mdl-textfield mdl-js-textfield">
                                <input className="mdl-textfield__input" type="text" id="username" name="username"
                                ref="email"/>
                                <label className="mdl-textfield__label" htmlFor="email">E-mail</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield">
                                <input className="mdl-textfield__input" type="password" id="userpass" name="password"
                                ref="password"/>
                                <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                            </div>
                        </form>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button onClick={() => this.handleLogin()} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" type="submit">Entrar</button>
                    </div>
                </div>
            </main>

            <Dialog
                title="Message"
                actions={<FlatButton
                    label="Close"
                    primary={true}
                    keyboardFocused={false}
                    onClick={() => this.setState({showMessageDialog: false})}
                />}
                modal={false}
                open={this.state.showMessageDialog}
                onRequestClose={() => this.setState({showMessageDialog: false})}>
                {this.state.message}
            </Dialog>

        </div>
            </MuiThemeProvider> )
    }

}

FormLogin.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {login, storeAuthCredentials, redirectIn})(FormLogin);
