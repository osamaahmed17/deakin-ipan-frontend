import React, { Component } from 'react';
import { footerBackButton } from 'helpers/floatingButtonHelper.js'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
    }
  }

  render() {
    return (
      <footer className="Footer page-footer footer-fixed">
        <div className="container">
          {footerBackButton(this.props.location.pathname)}
          <span className="app-name" id="app-name">
            IPAN
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer;
