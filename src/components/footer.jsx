import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'

class Footer extends Component {
  render() {
    return (
      <footer className="Footer page-footer footer-fixed">
        <div className="container">
          <span className="app-name center" id="app-name"> IPAN </span>
        </div>
      </footer>
    )
  }
}

export default Footer;
