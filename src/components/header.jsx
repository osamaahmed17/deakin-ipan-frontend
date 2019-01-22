import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogout } from 'actions';
import M from "materialize-css";
import API from 'helpers/api.js';
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import EventsView from 'views/events/eventsView.jsx'
import track from 'react-tracking'
import { E } from 'tracking/tracking.js'
var _ = require('underscore')

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
    this.props.tracking.trackEvent({ event: E.T_LOGOUT })
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
    M.Dropdown.init(calendar, { inDuration: 300, outDuration: 225, coverTrigger: false, constrainWidth: 'false', closeOnClick: false, });
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
              ALL PROGRAMS
            </Link>
          </li>
        </ul>
      )
    }
  }

  displayNotifications = (data) => {
    var sortNotificationsReverse = ''
    if (!_.isEqual(data, undefined)) sortNotificationsReverse = _.sortBy(data, data.deliverDateTime).reverse()
    else sortNotificationsReverse = []
    if (sortNotificationsReverse.length !== 0) {
      return (
        sortNotificationsReverse.map((items) => {
          return (
            <li key={items._id}>
              <Link to={{ pathname: items.appLink }}>
                {items.text}
              </Link>
            </li>
          )
        })
      )
    } else {
      return (
        <li>
          <p>
            No new notifications
          </p>
        </li>
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

            {/* <li><a className="progress-sidenav" id="progress-sidenav" href="#!"><i className="material-icons">adjust</i> <span>Progress</span> </a></li> */}
            <li>
              <Link to='#!'>
                <p className="progress-sidenav sidenav-close" id="progress-sidenav">
                  <i className="material-icons">adjust</i>
                  <span>
                    Progress
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: CONSTANTS.PROGRAMS }}>
                <p className="programs-sidenav sidenav-close" id="programs-sidenav">
                  <i className="material-icons">adjust</i>
                  <span>
                    Programs
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: CONSTANTS.FAVOURITE_MODULES }}>
                <p className="fav-modules-sidenav sidenav-close" id="fav-modules-sidenav">
                  <i className="material-icons">favorite_border</i>
                  <span>
                    Favourite Modules
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: CONSTANTS.FAVOURITE_ACTIVITIES }}>
                <p className="fav-activities-sidenav sidenav-close" id="fav-activities-sidenav">
                  <i className="material-icons">favorite_border</i>
                  <span>
                    Favourite Activities
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: CONSTANTS.PROFILE }}>
                <p className="profile-sidenav sidenav-close" id="profile-sidenav">
                  <i className="material-icons">face</i>
                  <span>
                    Profile
                  </span>
                </p>
              </Link>
            </li>
            <li><a className="logout-button sidenav-close" id="logout-btn-sidenav" onClick={this.logout} href="#!">Logout</a></li>
          </ul>

          {/* Desktop view menu */}
          <div className="navbar-fixed">
            <ul id="dropdown1" className="dropdown-content">
              <li>
                <Link to="#!">
                  <p id="my-programs">
                    My progress
                  </p>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: CONSTANTS.PROGRAMS }}>
                  <p>
                    My programs
                  </p>
                </Link>
              </li>
              {/* <li><a id="fav-modules" href={CONSTANTS.FAVOURITE_MODULES}>Favourite Modules</a></li> */}
              <li>
                <Link to={{ pathname: CONSTANTS.FAVOURITE_MODULES }}>
                  <p id="fav-modules">
                    Favourite Modules
                  </p>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: CONSTANTS.FAVOURITE_ACTIVITIES }}>
                  <p id="fav-activities">
                    Favourite Activities
                  </p>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: CONSTANTS.PROFILE }}>
                  <p id="profile">
                    Profile
                  </p>
                </Link>
              </li>
              <li>
                <a id="nav-logout-btn" className="nav-logout-btn" onClick={this.logout} href="#!">Logout</a>
              </li>
            </ul>
            <ul id='notification-dropdown' className='dropdown-content collection'>
              <div className="container">
                {this.displayNotifications(this.props.notifications)}
              </div>
            </ul>
            <ul id='calendar-dropdown' className='dropdown-content collection calendar-ul'>
              <li>
                <EventsView />
              </li>
            </ul>
            <nav>
              <div className="nav-wrapper">
                <a href="#!" data-target="side-nav" className="sidenav-trigger show-on-small right deakin-burger"><div><div className='deakin-burger-title' >Menu </div><div><i className="material-icons">menu</i></div></div></a>

                {/* Back button will directly take to programs page */}
                {this.programBackButton()}
                <ul id="nav-mobile" className="right">
                  {/* Calendar dropdown view */}
                  <li> <a href="#!" className="calendar-dropdown" data-target="calendar-dropdown" id="calendar-dropdown"> <i className="material-icons calendar" id="calendar" >event</i> </a> </li>
                  {/* Notification dropdown view */}
                  <li> <a href="#!" className='notification-dropdown' data-target="notification-dropdown" onClick={() => this.props.parentStateHandler({ unreadNotificationsCounter: 0 })}> <i className="material-icons">notifications<small className="notification-badge" id="notification-badge">{this.props.unreadNotificationsCounter}</small></i> </a></li>
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

const TRACK = track()(Header)

export default connect(null, mapDispatchToProps)(TRACK);
