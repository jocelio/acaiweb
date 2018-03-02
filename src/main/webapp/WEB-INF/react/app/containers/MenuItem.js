import React, { Component } from 'react';
import {Link} from 'react-router';

class MenuItem extends Component {

  render() {
    return (
        <Link to={this.props.href} activeClassName="mdl-navigation__link--active" className="mdl-navigation__link">
          <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">{this.props.icon}</i>
          {this.props.name}
        </Link>
    );
  }
}
export default MenuItem;
