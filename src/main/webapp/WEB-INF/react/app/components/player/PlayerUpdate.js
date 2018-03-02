import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlayer, updatePlayer } from './actions/actions_player';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import Anchor from '../../containers/Anchor';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { renderField, required } from '../../containers/FieldHelper';

class PlayerUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {showMessageDialog: false, message:''};
    }

    componentDidMount(){

        this.showMessage({text:`Loading...`, type:'info'});

        this.props.fetchPlayer(this.props.params.id).then(response =>{
            if(response.error) throw response.payload
            this.setState({showMessageDialog: false})
        }).catch((error) => {
            this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
        });

    }

    formSubmit(player){
        this.props.updatePlayer(player)
            .then((response) => {
                if(response.error) throw response.payload
                 this.showMessage({text:`${player.name} updated with success.`, type:'info'});
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

        if(!this.props.player){
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

                        <Field name="name" type="text" value="teste"
                            component={renderField} validate={[required]} label="Player Name"/>

                        <Field name="surname" type="text"
                            component={renderField} validate={[required]} label="Player Description"/>

                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <input type="submit" value="Update" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"/>
                        <Anchor name="Cancel" href="player" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"/>
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


PlayerUpdate.contextTypes = {
    router: PropTypes.object
};

PlayerUpdate = reduxForm({ form:'NewPlayerForm'})(PlayerUpdate);

function mapStateToProps(state){
    const {player} = state.playersState || null;
    if(player) {
        return {player: player
                     , initialValues: {
                         name:player.name
                       , surname:player.surname
                       , id:player.id
                    }
                }
    }
    return {player}
}

export default connect(mapStateToProps, {fetchPlayer, updatePlayer})(PlayerUpdate);
