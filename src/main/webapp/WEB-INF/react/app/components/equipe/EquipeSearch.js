import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchEquipes, deleteEquipe, searchEquipes } from './actions/actions_equipe';
import Anchor from '../../containers/Anchor';
import EquipeSearchForm from './EquipeSearchForm';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class EquipeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {showRemoveDialog:false, showMessageDialog:false, equipe:{}, message:"", view:'card'};
    }

    componentDidMount(){
        this.showMessage({text:`Loading...`, type:'info'});

        this.props.fetchEquipes()
            .then(response => {
                if(response.error) throw response.payload
                this.setState({showMessageDialog: false})

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });
    }


    handleRemoveItem(){
        this.handleCloseRemoveDialog();
        this.props.deleteEquipe(this.state.equipe)
            .payload.response
            .then(response => {

                if(response.error) throw response.payload

                this.setState({showMessageDialog: true, message:`Item deleted with success.`});

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });

        // this.props.fetchEquipes();
    }

    handleOpenRemoveDialog(equipe) {
        this.setState({showRemoveDialog: true, equipe: equipe});
    }

    handleCloseRemoveDialog(){
        this.setState({showRemoveDialog: false});
    }

    handleCloseMessageDialog(){
        this.setState({showMessageDialog: false});
    }

    changeView(){

        this.setState({view: this.state.view ==='table'?'card':'table'});

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

                    <Link to="equipe/new" className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
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

                        <EquipeSearchForm />

                    <hr/>

                    {(this.state.view ==='table')?this.tableEquipes():this.listEquipes()}

                    <Dialog
                        title="Remove Item"
                        actions={actions}
                        modal={false}
                        open={this.state.showRemoveDialog}
                        onRequestClose={() => this.handleCloseRemoveDialog()}>
                        Are you sure you want to remove {this.state.equipe.name}?
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


    listEquipes(){
        return (<ul> { _.map(this.props.equipes, (e) => this.renderCards(e))} </ul>)
    }

    tableEquipes(){
        return (<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                    <thead>
                    <tr>
                        <th>Equipe Name</th>
                        <th>Equipe Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                <tbody>
                    { _.map(this.props.equipes, (e) => this.renderTable(e))}
                </tbody>
            </table>)
    }

    renderCards(equipe){
        return (
            <li key={equipe.id}>
                <div className="demo-card-square mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title mdl-card--expand card-image" >
                        <img src={equipe.image} />
                        <h2 className="mdl-card__title-text">{equipe.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {equipe.description}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">

                        <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                              onClick={(e) => this.handleOpenRemoveDialog(equipe)}>Delete</Link>
                        &nbsp;
                        <Link to={`equipe/update/${equipe.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect">Update</Link>

                    </div>
                </div>
            </li>)
    }
    renderTable(equipe){
        return(
            <tr key={equipe.id} >
                <td>{equipe.name}</td>
                <td>{equipe.description}</td>
                <td className="td-center">

                    <Link to={this.props.href} className="mdl-button mdl-js-button mdl-js-ripple-effect"
                          onClick={(e) => this.handleOpenRemoveDialog(equipe)}>Delete</Link>
                    &nbsp;
                    <Anchor name="Update" href={`equipe/update/${equipe.id}`} className="mdl-button mdl-js-button mdl-js-ripple-effect"/>


                </td>
            </tr>
        )
    }

}

const mapStateToProps = state => {

   return {equipes: state.equipesState.all}

}

export default connect(mapStateToProps, { fetchEquipes, deleteEquipe, searchEquipes })(EquipeSearch);
