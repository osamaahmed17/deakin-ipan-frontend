import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";
import API from 'helpers/api.js';
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import CalendarView from 'views/calendar/calendarView.jsx'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      backButtonHide: false,
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
    // Drop down for menu
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225, coverTrigger: false, alignment: 'right', constrainWidth: 'false' });
    // Drop down for notification desktop view
    let elem = document.querySelectorAll('.notification-dropdown');
    M.Dropdown.init(elem, { inDuration: 300, outDuration: 225, coverTrigger: false, alignment: 'right', constrainWidth: 'false' });
    let calendar = document.querySelectorAll('.calendar-dropdown');
    // Drop down for calendar view
    M.Dropdown.init(calendar, { inDuration: 300, outDuration: 225, coverTrigger: false, constrainWidth: 'false', });
    let sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, { edge: 'right' });
  }

  programBackButton = () => {
    if (!(this.props.location.pathname === CONSTANTS.PROGRAMS)) {
      return (
        <ul>
          <li className="back-to-programs-button" id="back-to-programs-button">
            {/* If user directly visit the url then back button goes to landing page else createBackURL function will run*/}
            <Link to={{ pathname: CONSTANTS.PROGRAMS }}>
              PROGRAMS
            </Link>
          </li>
        </ul>
      )
    }
  }

  render() {
    return (
      <header>
        <div className='Header'>
          <ul className="sidenav slide-out" id="side-nav">
            <div className="profile-div">
              <li><img width="100px" src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle responsive-img" /></li>
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
              <li>
                <a href="#!" className="left-align">Program 1</a>
              </li>
              <li>
                <a href="#!" className="left-align">Program 2</a>
              </li>
              <li className="divider" tabIndex="-1"></li>
              <li><a href="#!" className="center-align">See all</a></li>
            </ul>
            <ul id='calendar-dropdown' className='dropdown-content collection calendar-ul'>
              <li> <div className="calendar-view center-align"> <CalendarView /> </div> </li>
            </ul>
            <nav>
              <div className="nav-wrapper">
                <a href="#!" data-target="side-nav" className="sidenav-trigger show-on-small right deakin-burger"><div><div className='deakin-burger-title' >Menu </div><div><i className="material-icons">menu</i></div></div></a>

                {/* Back button will taek directly take to programs page */}
                {this.programBackButton()}
                <ul id="nav-mobile" className="right">
                  {/* Calendar dropdown view */}
                  <li> <a href="#!" className="calendar-dropdown" data-target="calendar-dropdown" id="calendar-dropdown"> <i className="material-icons calendar" id="calendar" >event</i> </a> </li>
                  {/* Notification dropdown view */}
                  <li> <a href="#!" className='notification-dropdown' data-target="notification-dropdown"> <i className="material-icons">notifications<small className="notification-badge" id="notification-badge">2</small></i> </a></li>
                  <li className="hide-on-med-and-down user-avatar" id="user-avatar"> <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="circle header-avatar" /></li>
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
    dispatchLogout: () => dispatch(requestLogout())
  }
}

export default connect(null, mapDispatchToProps)(Header);
