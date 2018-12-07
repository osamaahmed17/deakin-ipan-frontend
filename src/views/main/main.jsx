import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from 'views/home/home.jsx'
import Team from 'views/team/team.jsx'
import UserPrograms from 'views/userProjects/userPrograms.jsx'
import UserProgram from 'views/userProjects/userProgram.jsx'
import UserModule from 'views/userProjects/userModule.jsx'
import UserActivity from 'views/userProjects/userActivity.jsx'
import UserTask from 'views/userProjects/userTasks.jsx'
import Calendar from 'react-calendar';
import Profile from 'views/profile/profile.jsx'
import { Switch, Route, Redirect } from 'react-router-dom'
import AppHelper from 'helpers/AppHelper'
import Error from 'views/error/error.jsx'

class Main extends Component {
  render() {
    return (
      <main>
        <div className="Main">
          <Switch>
            <Route exact path='/' render={ (props) => ( AppHelper.isUserLocalStorageLoggedIn() ? <Redirect to='/programs'/> : <div></div> )} />
            <Route exact path='/team' component={Team}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/programs' component={UserPrograms} />
            <Route exact path='/programs/:p_id' component={UserProgram} />
            <Route exact path='/programs/:p_id/modules/:m_id' component={UserModule} />
            <Route exact path='/programs/:p_id/modules/:m_id/activities/:a_id' component={UserActivity} />
            <Route exact path='/programs/:p_id/modules/:m_id/tasks/:t_id' component={UserTask} />
            <Route exact path='/activity/:a_id' component={UserActivity} />
            <Route exaxt path='/tasks/:t_id' component={UserTask} />
            <Route exact path='/calender' component={Calendar} />
            <Route render= {(props) => (
              <Error {...props} errorCode={401} />
            )} />
          </Switch>
        </div>
      </main>
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
