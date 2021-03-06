import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { fetchPlayers, deletePlayer, searchPlayer } from './actions/actions_player';
import Anchor from '../../containers/Anchor';
import PlayerSearchForm from './PlayerSearchForm';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class PlayerSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {showRemoveDialog:false, showMessageDialog:false, player:{}, message:"", view:'card'};
    }

    componentDidMount(){
        this.showMessage({text:`Loading...`, type:'info'});

        this.props.fetchPlayers()
            .then(response => {
                if(response.error) throw response.payload
                this.setState({showMessageDialog: false})

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });
    }


    handleRemoveItem(){
        this.handleCloseRemoveDialog();
        this.props.deletePlayer(this.state.player)
            .payload.response
            .then(response => {

                if(response.error) throw response.payload

                this.setState({showMessageDialog: true, message:`Item deleted with success.`});

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });

    }

    handleOpenRemoveDialog(player) {
        this.setState({showRemoveDialog: true, player: player});
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

                    <Link to="player/new" className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
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

                        <PlayerSearchForm />

                    <hr/>

                    {(this.state.view ==='table')?this.tablePlayers():this.listPlayers()}

                    <Dialog
                        title="Remove Item"
                        actions={actions}
                        modal={false}
                        open={this.state.showRemoveDialog}
                        onRequestClose={() => this.handleCloseRemoveDialog()}>
                        Are you sure you want to remove {this.state.player.name}?
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
        return <ul> {_.map(this.props.players, e => this.renderCards(e))} </ul>
    }

    tablePlayers(){
        return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                <tbody>
                    {_.map(this.props.players, e => this.renderTable(e))}
                </tbody>
            </table>)
    }

    renderCards(player){
        return (
            <li key={player.id}>
                <div className="players-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand card-image" >

                        {player.image && <img src={player.image} />}

                        <h2 className="mdl-card__title-text">{player.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {player.name} {player.surname} - {player.equipe && <strong> {player.equipe.name} </strong>}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">

                        <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                              onClick={(e) => this.handleOpenRemoveDialog(player)}>Delete</Link>
                        &nbsp;
                        <Link to={`player/update/${player.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect">Update</Link>

                    </div>
                </div>
            </li>)
    }
    renderTable(player){
        return(
            <tr key={player.id} >
                <td>{player.name}</td>
                <td>{player.description}</td>
                <td className="td-center">

                    <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                          onClick={(e) => this.handleOpenRemoveDialog(player)}>Delete</Link>
                    &nbsp;
                    <Anchor name="Update" href={`player/update/${player.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect"/>

                </td>
            </tr>
        )
    }

}

const mapStateToProps = state => {

    const {all} = state.playersState || []

    return {players: all}

}

export default connect(mapStateToProps, { fetchPlayers, deletePlayer, searchPlayer })(PlayerSearch);
