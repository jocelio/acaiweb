import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { fetchUsers, deleteUser, searchUser} from './redux/actions_user';
import Anchor from '../../containers/Anchor';
import UserSearchForm from './UserSearchForm';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {showRemoveDialog:false, showMessageDialog:false, user:{}, message:"", view:'table'};
    }

    componentDidMount(){
        this.showMessage({text:`Loading...`, type:'info'});

        this.props.fetchUsers()
            .then(response => {
                if(response.error) throw response.payload
                this.setState({showMessageDialog: false})

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });
    }


    handleRemoveItem(){
        this.handleCloseRemoveDialog();
        this.props.deleteUser(this.state.user)
            .payload.response
            .then(response => {

                if(response.error) throw response.payload

                this.setState({showMessageDialog: true, message:`Item deleted with success.`});

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });

    }

    handleOpenRemoveDialog(user) {
        this.setState({showRemoveDialog: true, user});
    }

    handleCloseRemoveDialog(){
        this.setState({showRemoveDialog: false});
    }

    handleCloseMessageDialog(){
        this.setState({showMessageDialog: false});
    }

    changeView(){
        if(this.state.view ==='table')
            this.setState({view:'card'});
        else
            this.setState({view:'table'});
    }

    showMessage({text = '', type ='info'}){
        const message = <span className={type == 'info'?'info-message':'error-message'}>{text}</span>
        this.setState({showMessageDialog: true, message:message});
    }

    render(){

        const actions = [
             <FlatButton label="Cancel" onClick={() => this.handleCloseRemoveDialog()} />
            ,<FlatButton label="Confirm" keyboardFocused={false} onClick={() => this.handleRemoveItem()}/>,
        ];

        return (
            <div className="mdl-card mdl-shadow--2dp large">

                <div className="mdl-card__menu">

                    <Link to="user/new" className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                        <i className="material-icons new-item-icon">add_box</i>
                    </Link>

                    <button onClick={() => this.changeView()} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                        <i className="material-icons">{this.state.view ==='table'?'dashboard':'grid_on'}</i>
                    </button>

                </div>
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{this.props.title}</h2>
                </div>
                <div className="mdl-card__supporting-text">

                    <hr/>

                        <UserSearchForm />

                    <hr/>

                    {(this.state.view ==='table')?this.tablePlayers():this.listPlayers()}

                    <Dialog
                        title="Remove Item"
                        actions={actions}
                        modal={false}
                        open={this.state.showRemoveDialog}
                        onRequestClose={() => this.handleCloseRemoveDialog()}>
                        Are you sure you want to remove {this.state.user.name}?
                    </Dialog>

                    <Dialog
                        title="Message"
                        actions={<FlatButton
                            label="Close"
                            primary={true}
                            keyboardFocused={false}
                            onClick={() => this.handleCloseMessageDialog()}
                        />}
                        modal={false}
                        open={this.state.showMessageDialog}
                        onRequestClose={() => this.handleCloseMessageDialog()}>
                        {this.state.message}
                    </Dialog>
                </div>
            </div>
        )
    }


    listPlayers(){
        return <ul> {_.map(this.props.users, e => this.renderCards(e))} </ul>
    }

    tablePlayers(){
        return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>E-mail</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                <tbody>
                    {_.map(this.props.users, e => this.renderTable(e))}
                </tbody>
            </table>)
    }

    renderCards(user){
        return (
            <li key={user.id}>
                <div className="players-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand card-image" >

                        {user.image && <img src={user.image} />}

                        <h2 className="mdl-card__title-text">{user.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {user.username}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">

                        <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                              onClick={(e) => this.handleOpenRemoveDialog(user)}>Delete</Link>
                        &nbsp;
                        <Link to={`user/update/${user.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect">Update</Link>

                    </div>
                </div>
            </li>)
    }
    renderTable(user){
        return(
            <tr key={user.id} >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="td-center">

                    <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                          onClick={(e) => this.handleOpenRemoveDialog(user)}>Delete</Link>
                    &nbsp;
                    <Anchor name="Update" href={`user/update/${user.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect"/>

                </td>
            </tr>
        )
    }

}

const mapStateToProps = state => {

    return {users: state.userState.all}

}

export default connect(mapStateToProps, { fetchUsers, deleteUser, searchUser })(UserSearch);
