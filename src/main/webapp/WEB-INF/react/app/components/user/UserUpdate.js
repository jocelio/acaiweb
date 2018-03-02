import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from './redux/actions_user';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Anchor from '../../containers/Anchor';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { renderField, required } from '../../containers/FieldHelper';

class UserUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {showMessageDialog: false, message:''};
    }

    componentDidMount(){

        this.showMessage({text:`Loading...`, type:'info'});

        this.props.fetchUser(this.props.params.id).then(response =>{
            if(response.error) throw response.payload
            this.setState({showMessageDialog: false})
        }).catch((error) => {
            this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
        });

    }

    formSubmit(user){
        this.props.updateUser(user)
            .then((response) => {
                if(response.error) throw response.payload
                 this.showMessage({text:`${user.username} updated with success.`, type:'info'});
            })
            .catch((error) => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });

        // this.context.router.push('/equipe');

    }

    showMessage({text = '', type ='info'}){
        const message = <span className={type == 'info'?'info-message':'error-message'}>{text}</span>
        this.setState({showMessageDialog: true, message:message});
    }

    render(){

        if(!this.props.user){
            return <div>Loading...</div>
        }

        const { handleSubmit} = this.props;
        return (
            <div>
            <form onSubmit={handleSubmit((props) => this.formSubmit(props))}>

                <div className="mdl-card mdl-shadow--2dp large">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">{this.props.title}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">

                        <Field name="username" type="text"
                            component={renderField} validate={[required]} label="Username"/>

                        <Field name="email" type="text"
                            component={renderField} validate={[required]} label="E-mail"/>

                        <Field name="password" type="password"
                               component={renderField} validate={[required]} label="Sova Senha"/>

                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <input type="submit" value="Update" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"/>
                        <Anchor name="Cancel" href="user" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"/>
                    </div>
                </div>
            </form>
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
        )
    }

    componentDidUpdate(){
        try{componentHandler.upgradeAllRegistered();}catch (e){}
    }
}


UserUpdate.contextTypes = {
    router: PropTypes.object
};

UserUpdate = reduxForm({ form:'NewUserForm'})(UserUpdate);

function mapStateToProps(state){

    const {user} = state.userState;

    if(user) {
        return {user
                , initialValues: {username:user.username, email:user.email, id:user.id}
               }
    }
    return {user}
}

export default connect(mapStateToProps, {fetchUser, updateUser})(UserUpdate);
