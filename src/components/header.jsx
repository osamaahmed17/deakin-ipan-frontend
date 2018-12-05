import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";
import API from 'helpers/api.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.getName();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getName = () => {
    API.getName(this.stateHandler);
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatchLogout()
    AppHelper.logoutUser()
  }

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, { edge: 'right'});
  }

  render() {
    return (
      <div>
        <ul className="sidenav" id="mobile-demo">
          <li><img width="100px" src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle responsive-img"/></li>
          <h5>{this.state.name}</h5>
          <li><a href="#!">My progress</a></li>
          <li><a href="/programs">Browse programs</a></li>
          <li><a href="#!">Invitations</a></li>
          <li><a href="#!">Events</a></li>
          <li><a href="#!">Notifications</a></li>
          <li><a href="/profile">My Profile</a></li>
          <li><a onClick={this.logout} href="#!">Logout</a></li>
        </ul>
        <div className="navbar-fixed">
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">My progress</a></li>
            <li><a href="/programs">Browse programs</a></li>
            <li><a href="#!">Invitations</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li><a onClick={this.logout} href="#!">Logout</a></li>
          </ul>

          <nav>
            <div className="nav-wrapper">
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger show-on-small right"><i className="material-icons">menu</i></a>
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              <ul>
                <li>
                  <a href="#!"><i className="material-icons">arrow_back</i></a>
                </li>
              </ul>
              
              <ul id="nav-mobile" className="right">
                <li className="hide-on-med-and-down"> <a className="dropdown-trigger" data-target="dropdown1" href="#!"><i className="material-icons">dehaze</i></a></li>
                <li className="hide-on-med-and-down"> <a href="#!"><i className="material-icons">event</i></a></li>
                <li className="hide-on-med-and-down"> <a href="#!"><i className="material-icons">notifications</i></a></li>
                <li className="hide-on-med-and-down"> <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle header-avatar"/></li>
                <li className="hide-on-med-and-down header-username">{this.state.name}</li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogout : () => dispatch(requestLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
