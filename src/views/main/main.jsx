import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from 'views/home/home.jsx'
import Team from 'views/team/team.jsx'
import UserPrograms from 'views/userProjects/userPrograms.jsx'
import UserProgram from 'views/userProjects/userProgram.jsx'
import UserModule from 'views/userProjects/userModule.jsx'
import UserActivity from 'views/userProjects/userActivity.jsx'
import UserTask from 'views/userProjects/userTasks.jsx'
import ViewCalendar from 'views/calendar/calendar.jsx'
import FavouriteModules from 'views/userProjects/favouriteModules.jsx'
import FavouriteActivities from 'views/userProjects/favouriteActivities.jsx'
import Profile from 'views/profile/profile.jsx'
import { Switch, Route, Redirect } from 'react-router-dom'
import AppHelper from 'helpers/AppHelper'
import Error from 'views/error/error.jsx'
import Resources from 'views/resources/resources.jsx'
import Notifications from 'views/notifications/notification.jsx'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class Main extends Component {
  render() {
    return (
      <div className="main-content">
        <Switch>
          <Route exact path='/' render={ (props) => ( AppHelper.isUserLocalStorageLoggedIn() ? <Redirect to='/programs'/> : <div></div> )} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.TEAM)} component={Team}/>
          <Route exact path= {replacePlaceHolder(CONSTANTS.HOME)} component={Home}/>
          <Route exact path= {replacePlaceHolder(CONSTANTS.PROFILE)} component={Profile}/>
          <Route exact path= {replacePlaceHolder(CONSTANTS.PROGRAMS)} component={UserPrograms} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.PROGRAM, [":p_id"])} component={UserProgram} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.MODULES, [":p_id", ":m_id"])} component={UserModule} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.ACTIVITIES, [":p_id", ":m_id", ":a_id"])} component={UserActivity} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.TASKS, [":p_id", ":m_id", ":t_id"])} component={UserTask} />
          {/* <Route exact path= {replacePlaceHolder(CONSTANTS.} component={UserActivity} />
          <Route exaxt path= {replacePlaceHolder(CONSTANTS.} component={UserTask} /> */}
          <Route exact path= {CONSTANTS.CALENDAR} component={ViewCalendar} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.RESOURCES)} component={Resources} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.FAVOURITE_ACTIVITIES)} component={FavouriteActivities} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.FAVOURITE_MODULES)} component={FavouriteModules} />
          <Route exact path= {replacePlaceHolder(CONSTANTS.NOTIFICATIONS)} component={Notifications} />
          <Route render= {(props) => (
            <Error {...props} errorCode={404} />
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      loggedIn : state.loginStatus.loggedIn,
      loading : state.loginStatus.loading,
      userRole : state.loginStatus.userRole
  }
}

export default connect(mapStateToProps)(Main);
