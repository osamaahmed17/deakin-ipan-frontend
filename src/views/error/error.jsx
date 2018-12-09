import React, { Component } from 'react';

class Error extends Component {
  renderMessage = (errorCode) => {
    let msg = '';
    switch (errorCode) {
      case 404:
        msg = 'Page not found';
        break;
      case 401:
        msg = 'Not authorised';
        break;
      default:
        msg = 'Something went wrong. Please refresh the page.'
        break;
    }
    return msg;
  }

  render() {
    return (
      <div className="errorStyle">
        {/* <i className="large material-icons">error_outline</i> */}
        <h1>{this.props.errorCode}</h1>
        <p>{this.renderMessage(this.props.errorCode)}</p>
      </div>
    )
  }
}

export default Error;