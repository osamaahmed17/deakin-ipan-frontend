import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";

class Header extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.dispatchLogout()
    AppHelper.logoutUser()
  }

  componentDidMount() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }

  render() {
    return (
      <div>
        <ul className="sidenav" id="mobile-demo">
          <li><a href="#!">My progress</a></li>
          <li><a href="#!">Browse programs</a></li>
          <li><a href="#!">Invitations</a></li>
          <li><a href="/profile">My Profile</a></li>
          <li> <a onClick={this.logout} href="#!">Logout</a></li>
        </ul>
        <div className="navbar-fixed">
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">My progress</a></li>
            <li><a href="#!">Browse programs</a></li>
            <li><a href="#!">Invitations</a></li>
            <li><a href="/profile">My Profile</a></li>
            <li> <a onClick={this.logout} href="#!">Logout</a></li>
          </ul>

          <nav>
            <div className="nav-wrapper">
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger show-on-small"><i className="material-icons">menu</i></a>
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              <ul id="nav-mobile" className="right">
                <li> <a href="#!"><i className="material-icons">event</i></a></li>
                <li> <a href="#!"><i className="material-icons">notifications</i></a></li>
                <li className="hide-on-med-and-down" > <a className="dropdown-trigger" data-target="dropdown1" href="#!"><i className="material-icons">dehaze</i></a></li>
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
