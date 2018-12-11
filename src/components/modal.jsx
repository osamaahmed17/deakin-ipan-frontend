import React, { Component } from 'react';
import M from "materialize-css";

// Modal is used for delivering notifications where title and description are passed as props and rest of content passed as children
class Modal extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      startingTop: "4%",
      endingTop: "10%",
      dismissible: true
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <div ref={Modal => { this.Modal = Modal; }} id="modal" className="modal">
        <div className="modal-content">
          <p>{this.props.data.title}</p>
          <div className="divider"></div>
          <p>{this.props.data.description}</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;