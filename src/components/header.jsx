import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";
import API from 'helpers/api.js';
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'

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
      return CONSTANTS.PROGRAMS
    } else if(str === CONSTANTS.RESOURCES) {
      return CONSTANTS.BASE_URL
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
    // Drop down for menu
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225, coverTrigger: false, alignment: 'right', constrainWidth:'false' });
    // Drop down for notification desktop view
    let elem = document.querySelectorAll('.notification-dropdown');
    M.Dropdown.init(elem, { inDuration: 300, outDuration: 225, coverTrigger: false, alignment: 'right', constrainWidth:'false' });
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, { edge: 'right'});
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
            
            <li><a className="progress-sidenav" id="progress-sidenav" href="#!"><i className="material-icons">adjust</i> <span>Progress</span> </a></li>
            <li><a className="programs-sidenav" id="programs-sidenav" href={CONSTANTS.PROGRAMS}><i className="material-icons">adjust</i> <span>Programs</span> </a></li>
            <li><a className="fav-modules-sidenav" id="fav-modules-sidenav" href={CONSTANTS.FAVOURITE_MODULES}><i className="material-icons">favorite_border</i> <span>Favourite Modules</span> </a></li>
            <li><a className="fav-activities-sidenav" id="fav-activities-sidenav" href={CONSTANTS.FAVOURITE_ACTIVITIES}><i className="material-icons">favorite_border</i> <span>Favourite Activities</span> </a></li>
            <li><a className="profile-sidenav" id="profile-sidenav" href={CONSTANTS.PROFILE}><i className="material-icons">face</i> <span>Profile</span></a></li>
            <li><a className="logout-button sidenav-close" id="logout-btn-sidenav" onClick={this.logout} href="#!">Logout</a></li>
          </ul>
          <div className="navbar-fixed">
            <ul id="dropdown1" className="dropdown-content">
              <li><a href="#!">My progress</a></li>
              <li><a id="my-programs" href={CONSTANTS.PROGRAMS}>My programs</a></li>
              <li><a id="fav-modules" href={CONSTANTS.FAVOURITE_MODULES}>Favourite Modules</a></li>
              <li><a id="fav-activities" href={CONSTANTS.FAVOURITE_ACTIVITIES}>Favourite Activities</a></li>
              <li><a id="profile" href={CONSTANTS.PROFILE}>Profile</a></li>
              <li><a id="nav-logout-btn" className="nav-logout-btn" onClick={this.logout} href="#!">Logout</a></li>
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
                  <li style={this.checkURL(this.createBackURL('/', this.props.location.pathname))}>
                    <Link to={this.createBackURL('/', this.props.location.pathname)}>
                      <i className="material-icons back-btn" id="back-btn">arrow_back</i>
                    </Link>
                  </li>
                </ul>
                <ul id="nav-mobile" className="right">
                  <li> <Link to="/calendar"> <i className="material-icons calendar" id="calendar" >event</i> </Link></li>
                  <li className="hide-on-med-and-down notification" id="notification"> <a href="#!" className='notification-dropdown' data-target="notification-dropdown"> <i className="material-icons">notifications<small className="notification-badge" id="notification-badge">5</small></i> </a></li>
                  <li className="hide-on-large-only notification" id="notification"><Link to={CONSTANTS.NOTIFICATIONS}> <i className="material-icons">notifications<small className="notification-badge" id="notification-badge">1</small></i> </Link> </li>
                  <li className="hide-on-med-and-down user-avatar" id="user-avatar"> <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle header-avatar"/></li>
                  <li className="hide-on-med-and-down header-username">{this.state.name}</li>
                  <li className="hide-on-med-and-down menu-dropdown" id="menu-dropdown"> <a className="dropdown-trigger" data-target="dropdown1" href="#!"><i className="material-icons">menu</i></a></li>
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
