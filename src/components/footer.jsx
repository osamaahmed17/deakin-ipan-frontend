import React, { Component } from 'react';
import { createBackButtonURL } from 'components/floatingButtonHelper'
import { Link } from 'react-router-dom'
var _ = require('underscore');

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      footerScrollBottomStatus: false,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      this.setState({
        footerScrollBottomStatus: true
      })
    } else {
      this.setState({
        footerScrollBottomStatus: false
      })
    }
  }

  footerBackButton = () => {
    var pathname = this.props.location.pathname
    if (_.isEqual(this.state.footerScrollBottomStatus, true) && 
      (pathname.includes('/modules/') || 
      pathname.includes('/tasks/') || 
      pathname.includes('/summary') || 
      pathname.includes('/activities/'))) {
      return (
        <Link to={createBackButtonURL('/', pathname)}>
          <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
            <i className="material-icons"> arrow_back </i>
          </button>
        </Link>
      )
    }
  }

  render() {
    return (
      <footer className="Footer page-footer footer-fixed">
        <div className="container">
          <span>
            {this.footerBackButton()}
          </span>
          <span className="app-name" id="app-name">
            IPAN
          </span>
        </div>
      </footer>
    )
  }
}

export default Footer;
