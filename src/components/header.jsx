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
    // Next 2 line code is for special case path back button like Programs, and other cases in future
    if(((str.split('/').length -1) === 2) && (str.split('resources').length)) {
      return '/programs'
    } else if(str === '/resources') {
      return '/home'
    } else {
      let location = []
      let i = -1
      while((i = str.indexOf(subStr,i+1)) >=0 ) location.push(i);
      // Store the last second '/' position
      location = location.splice(0,location.length-1)
      location = location.splice(-1)
      // newLocation will store location from 0 to location
      let newLocation = str.substring(0, location)
      return newLocation;
    }
    // Rest of the code is trimming URL till last 2nd '/' from behind
    // Location is array which is used to store position of '/'
    
  }

  // If URL is empty then Back button is not diplayed
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
    let elem = document.querySelectorAll('.notification-dropdown');
    M.Dropdown.init(elem, { inDuration: 300, outDuration: 225, coverTrigger: false, alignment: 'right', constrainWidth:'false' });
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, { edge: 'right'});
  }

  handleModalClick = () => {
    var data = {
      title: 'Activity Pill 1',
      description: 'You should try to put your kids to sleep to achieve maximum efficency' 
    }
    return (
      <Modal data={data}>
        <div className="modal-footer">
        <Link to="/programs/1/modules/1/activities/1">
          <button className="btn waves-effect waves-light modal-close">Go To Activity</button>
        </Link>
        <button className="btn waves-effect waves-light modal-close">Dismiss</button>
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <header>
        <div className='Header'>
          <ul className="sidenav slide-out" id="side-nav">
            <div className="profile-div">
            <li><img width="100px" src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle responsive-img"/></li>
            <span className='name-profile'>{this.state.name}</span>
            </div>
            
            <li><a href="#!"><i className="material-icons">adjust</i> <span>Progress</span> </a></li>
            <li><a href="/programs"><i className="material-icons">adjust</i> <span>Programs</span> </a></li>
            <li><a href="/favouriteModules"><i className="material-icons">favorite_border</i> <span>Modules</span> </a></li>
            <li><a href="/favouriteActivities"><i className="material-icons">favorite_border</i> <span>Activities</span> </a></li>
            <li><a href="/profile"><i className="material-icons">face</i> <span>Profile</span></a></li>
            <li><a className='logout-button' onClick={this.logout} href="#!">Logout</a></li>
          </ul>
          <div className="navbar-fixed">
            <ul id="dropdown1" className="dropdown-content">
              <li><a href="#!">My progress</a></li>
              <li><a href="/programs">My programs</a></li>
              <li><a href="/favouriteModules">Favourite Modules</a></li>
              <li><a href="/favouriteActivities">Favourite Activities</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a  onClick={this.logout} href="#!">Logout</a></li>
            </ul>
            <ul id='notification-dropdown' className='dropdown-content collection'>
              <li><a href="#!">Program 1</a></li>
              <li><a href="#!">Program 2</a></li>
              <li className="divider" tabIndex="-1"></li>
              <li><a href="#!">See all</a></li>
            </ul>
            <nav>
              <div className="nav-wrapper">
                <a href="#!" data-target="side-nav" className="sidenav-trigger show-on-small right deakin-burger"><div><div className='deakin-burger-title' >Menu </div><div><i className="material-icons">menu</i></div></div></a>
                
                {/* <a href="/home" className="brand-logo left">{this.props.title}</a> */}
                <ul>
                  <li>
                    <a style={this.checkURL(this.createBackURL('/', this.props.location.pathname))} href={this.createBackURL('/', this.props.location.pathname)}><i className="material-icons">arrow_back</i></a>
                  </li>
                </ul>
                <ul id="nav-mobile" className="right">
                  <li> <a href="/calendar"><i className="material-icons">event</i></a></li>
                  <li className="hide-on-med-and-down"> <a href="#!" className='notification-dropdown' data-target="notification-dropdown"> <i className="material-icons">notifications<small className="notification-badge">5</small></i> </a></li>
                  <li className="hide-on-large-only"><Link to="/notifications"> <i className="material-icons">notifications<small className="notification-badge">1</small></i> </Link> </li>
                  <li className="hide-on-med-and-down"> <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle header-avatar"/></li>
                  <li className="hide-on-med-and-down header-username">{this.state.name}</li>
                  <li className="hide-on-med-and-down"> <a className="dropdown-trigger" data-target="dropdown1" href="#!"><i className="material-icons">menu</i></a></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogout : () => dispatch(requestLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
