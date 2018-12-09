import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";
import API from 'helpers/api.js';
import Modal from 'components/modal.jsx'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
    this.getName();
  }

  createBackURL = (subStr, str) => {
    let location = []
    let i = -1
    while((i = str.indexOf(subStr,i+1)) >=0 ) location.push(i);
    location = location.splice(0,location.length-1)
    location = location.splice(-1)
    let newLocation = str.substring(0, location)
    return newLocation;
  }

  checkURL = (data) => {
    if (data === '') {
      return {display:"none"}
    }
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

  modalClick = () => {
    var data = {
      title: 'Activity Pill 1',
      description: 'You should try to put your kids to sleep to achieve maximum efficency' 
    }
    return (
      <Modal data={data}>
        <div className="modal-footer">
        <Link to="/programs/1/modules/1/activities/1">
          <button className="btn waves-effect waves-light">Go To Activity</button>
        </Link>
        <button className="btn waves-effect waves-light modal-close">Dismiss</button>
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <ul className="sidenav slide-out" id="side-nav">
          <li><img width="100px" src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle responsive-img"/></li>
          <h5>{this.state.name}</h5>
          <li><a href="#!">My progress</a></li>
          <li><a href="/programs">My programs</a></li>
          <li><a href="#!">Favorite Modules</a></li>
          <li><a href="#!">Favorite Activities</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a onClick={this.logout} href="#!">Logout</a></li>
        </ul>
        <div className="navbar-fixed">
          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">My progress</a></li>
            <li><a href="/programs">My programs</a></li>
            <li><a href="#!">Favourite Modules</a></li>
            <li><a href="#!">Favourite Activities</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a onClick={this.logout} href="#!">Logout</a></li>
          </ul>

          <nav>
            <div className="nav-wrapper">
              <a href="#!" data-target="side-nav" className="sidenav-trigger show-on-small right"><i className="material-icons">menu</i></a>
              <a href="#!" className="brand-logo center">{this.props.title}</a>
              
              <ul>
                <li>
                  <a style={this.checkURL(this.createBackURL('/', this.props.location.pathname))} href={this.createBackURL('/', this.props.location.pathname)}><i className="material-icons">arrow_back</i></a>
                </li>
              </ul>
              <ul id="nav-mobile" className="right">
                <li className="hide-on-med-and-down"> <a className="dropdown-trigger" data-target="dropdown1" href="#!"><i className="material-icons">dehaze</i></a></li>
                <li className="hide-on-med-and-down"> <a href="/calendar"><i className="material-icons">event</i></a></li>
                <li> <a href="#!" data-target="modal" className="modal-trigger"> <i className="material-icons">notifications</i> </a> </li>
                <li className="hide-on-med-and-down"> <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle header-avatar"/></li>
                <li className="hide-on-med-and-down header-username">{this.state.name}</li>
              </ul>
            </div>
          </nav>
          {this.modalClick()}
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
