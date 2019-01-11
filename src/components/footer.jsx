import React, { Component } from 'react';
import { Link } from 'react-router-dom'
var _ = require('underscore');

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      scrollBottomStatus: false,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      this.setState({
        scrollBottomStatus: true
      })
    } else {
      this.setState({
        scrollBottomStatus: false
      })
    }
  }

  footerBackButton = () => {
    if (_.isEqual(this.state.scrollBottomStatus, true) && (this.props.location.pathname.includes('/modules/') || this.props.location.pathname.includes('/tasks/') || this.props.location.pathname.includes('/summary') || this.props.location.pathname.includes('/activities/'))) {
      return (
        <Link to={this.createBackButtonURL('/', this.props.location.pathname)}>
          <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
            <i className="material-icons"> arrow_back </i>
          </button>
        </Link>
      )
    }
  }

  createBackButtonURL = (subStr, str) => {
    // Use document.referrer to get last visited location
    let location = []
    let i = -1
    while ((i = str.indexOf(subStr, i + 1)) >= 0) location.push(i);
    // If str last string on right after '/' is Number then slice 2 times else slice one 
    if (isNaN(str.slice(location.slice(-1).pop() + 1))) {
      location = location.splice(0, location.length)
      location = location.splice(-1)
      let newLocation = str.substring(0, location)
      return newLocation;
    } else {
      location = location.splice(0, location.length - 1)
      location = location.splice(-1)
      if (location.length === 1 && location[0] === 0) {
        let newLocation = ''
        return newLocation
      } else {
        let newLocation = str.substring(0, location)
        return newLocation;
      }
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
