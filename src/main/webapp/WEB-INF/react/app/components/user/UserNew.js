import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from './redux/actions_user';
import { reduxForm, Field } from 'redux-form';
import Anchor from '../../containers/Anchor';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { renderField, required } from '../../containers/FieldHelper';
import Cropper from 'react-crop';

class UserNew extends Component {

    constructor(props) {
        super(props);
        this.state = {showMessageDialog: false, message:'',image: null,previewImage: null, userId: null};
    }

    formSubmit(user){
        this.refs.crop.cropImage().then((img) => {

            Object.assign(user, {image:img, userId: this.state.userId});

            this.props.createUser(user).then(response => {

                if(response.error) throw response.payload;

                this.setState({previewUrl: null,image: null, showMessageDialog: true, message:`${user.username} created with success.`});
                this.props.reset();

            }).catch(error => {
                this.showMessage({text:`Something wrong happened, please try again later.`, type:'error'});
            });

        });
    }

    onChange(evt) {
        this.setState({
            image: evt.target.files[0]
        })
    }

    crop() {

        this.refs.crop.cropImage().then((img)=> {
            this.setState({
                previewUrl: (window.URL || window.webkitURL).createObjectURL(img)
            })
        })
    }

    clear() {
        this.refs.file.value = null
        this.setState({previewUrl: null,image: null})
    }

    imageLoaded(img) {
        // if (img.naturalWidth && img.naturalWidth < 262 &&
        //     img.naturalHeight && img.naturalHeight < 147) {
        //     this.crop()
        // }
    }

    showMessage({text = '', type ='info'}){
        const message = <span className={type == 'info'?'info-message':'error-message'}>{text}</span>
        this.setState({showMessageDialog: true, message:message});
    }

    render(){

        const { handleSubmit } = this.props;

        return (
            <div>
            <form onSubmit={handleSubmit((props) => this.formSubmit(props))}>

                        <div className="mdl-card mdl-shadow--2dp large ">
                            <div className="mdl-card__title">
                                <h2 className="mdl-card__title-text">{this.props.title}</h2>
                            </div>
                            <div className="mdl-card__supporting-text">

                                <div className="content-grid mdl-grid" style={{"maxHeight":"300px","height":"auto","padding":"0px"}}>
                                    <div className="mdl-cell mdl-cell--4-col" style={{"margin":"0px"}}>


                                        <input required ref='file' id="file" type='file' onChange={(e) => this.onChange(e)}
                                               style={{"display":"none"}}/>
                                        <label htmlFor="file" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"
                                               style={{"paddingBotton":"2px"}}>
                                            <i className="material-icons">person</i>
                                        </label>

                                        {this.state.image &&

                                            <div  style={{height: 400, width: '30%'}}>
                                                <Cropper
                                                    height={231}
                                                    width={212}
                                                    ref='crop'
                                                    image={this.state.image}
                                                    onImageLoaded={() => this.imageLoaded()}/>

                                            </div>

                                        }

                                    </div>
                                    {this.state.image &&
                                        <div className="mdl-cell mdl-cell--3-col " style={{"paddingTop":"120px"}}>

                                            <button type="button" onClick={() => this.crop()}
                                                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Crop</button>
                                            &nbsp;

                                            <button type="button" onClick={() => this.clear()}
                                                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Clear</button>
                                        </div>
                                    }
                                    <div className="mdl-cell mdl-cell--4-col" style={{"marginTop":"38px"}}>
                                        {this.state.previewUrl &&
                                            <div>
                                                <span>Player Image</span><br/>
                                                <img src={this.state.previewUrl} />
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                            <div className="mdl-card__actions mdl-card--border">

                                <Field name="username" type="text"
                                       component={renderField} validate={[required]} label="Username"/>

                                <Field name="email" type="text"
                                       component={renderField} validate={[required]} label="E-mail"/>

                                <Field name="password" type="password"
                                       component={renderField} validate={[required]} label="Senha"/>
                            </div>
                            <div className="mdl-card__actions mdl-card--border">
                                <input type="submit" value="Save" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                                       disabled={!this.state.image}/>
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

    componentDidMount(){
        try{
            componentHandler.upgradeAllRegistered();
        }catch (e){}
    }
}

UserNew = reduxForm({
    form:'NewUserForm',
})(UserNew);

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { createUser })(UserNew);
