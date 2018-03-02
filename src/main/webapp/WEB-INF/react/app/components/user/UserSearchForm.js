import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser, filterUsers } from './redux/actions_user';
import { reduxForm, Field } from 'redux-form';
import { renderField } from '../../containers/FieldHelper';

class UserSearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {showMessageDialog: false, message:''};
    }

    formSubmit(props){
        this.props.searchUser(props)
            .then((response) => {
                if(response.error) throw response.payload
            }).catch((error) => {
                console.log(error)
            });
    }

    handleKeyPress(props){
        const {name , value} = props.target;
        this.props.filterUsers(this.props.users, {[name]: value});
    }

    render(){

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit((props) => this.formSubmit(props))}>

                <Field name="name" type="text" onBlur={()=>{}} onFocus={()=>{}}
                    component={renderField} label="Name"
                       onChange={(props) => this.handleKeyPress(props)}/>

                <Field name="surname" type="text" onBlur={()=>{}} onFocus={()=>{}}
                    component={renderField} label="Surname"
                       onChange={(props) => this.handleKeyPress(props)}/>

                <br/>

            </form>
        )
    }

    componentDidMount(){
        try{componentHandler.upgradeAllRegistered()}catch (e){}
    }

}

UserSearchForm = reduxForm({ form:'UserSearchForm'})(UserSearchForm);

const mapStateToProps = (state) => {

    const {holdUsers, all} = state.userState || {};

    return {users: holdUsers || all}

}

export default connect(mapStateToProps, { searchUser, filterUsers })(UserSearchForm);
