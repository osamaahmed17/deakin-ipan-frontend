import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from 'views/home/home.jsx'
import Team from 'views/team/team.jsx'
import Profile from 'views/profile/profile.jsx'
import { Switch, Route, Redirect } from 'react-router-dom'
import AppHelper from 'helpers/AppHelper'

class Main extends Component {
  render() {
    return (
      <main>
        <div className="Main">
          <Switch>
            <Route exact path='/' render={ (props) => ( AppHelper.isUserLocalStorageLoggedIn() ? <Redirect to='/home'/> : <div></div> )} />
            <Route exact path='/team' component={Team}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/profile' component={Profile}/>
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
