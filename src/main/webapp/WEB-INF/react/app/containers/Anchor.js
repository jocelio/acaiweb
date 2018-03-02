import React, { Component } from 'react';

class Anchor extends Component {

  render() {
    return (
        <a href={`/#/${this.props.href}`} className={this.props.className}>
          {this.props.name}
        </a>
    );
  }
}
export default Anchor;
