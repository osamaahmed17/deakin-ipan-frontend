import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.scss'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-icons/iconfont/material-icons.css'
import Header from 'components/header.jsx'
import AppHelper from "helpers/AppHelper.js";
import Footer from 'components/footer.jsx';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoadingComponent from 'components/loading/loading.jsx';
import { requestAccessTokenLogin } from 'actions';
import Login from 'views/login/login.jsx';
import Home from 'views/home/home.jsx';
import UserPrograms from 'views/userProjects/userPrograms.jsx'
import UserProgram from 'views/userProjects/userProgram.jsx'
import UserModule from 'views/userProjects/userModule.jsx'
import UserActivity from 'views/userProjects/userActivity.jsx'
import UserTask from 'views/userProjects/userTasks.jsx'
import ViewCalendar from 'views/calendar/calendar.jsx'
import FavouriteModules from 'views/userProjects/favouriteModules.jsx'
import FavouriteActivities from 'views/userProjects/favouriteActivities.jsx'
import TaskSummary from 'views/taskSummary/taskSummary.jsx'
import Profile from 'views/profile/profile.jsx'
import Resources from 'views/resources/resources.jsx'
import Notifications from 'views/notifications/notification.jsx'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'
import io from 'socket.io-client'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'IPAN',
      notifications: []
    };
  }

  // Used to handle state from children
  stateHandler = (state) => {
    this.setState(
      state
    )
  }

  socket = null
  initializeSocketListener = (token) => {
    console.log('Socket initialized')
    var options = {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      query: {token: token}
    }
    this.socket = io(process.env.REACT_APP_BASE_URL, options)
    this.socket.on("connect", ()=> console.log("Socket connection established: ", this.socket.id))
    this.socket.on("disconnect", ()=> console.log("Socket disconnected"))
    this.socket.on("connect_failed", () => console.log("Socket connection failed: ", this.socket.id))
    this.socket.on('notification', (data) => {
      console.log('Notification recieved', data.text)
      // TODO: push data object to state's notifications array
    })
  }

  componentDidMount() {
    let token = ''
    if ((token = AppHelper.isUserLocalStorageLoggedIn())) {
      if (token === 'true') return;
      this.props.dispatchAccessTokenLogin(token)
        .then((response) => {
          console.log(response);
          if (response.payload.status === 200) {
            console.log('Initializing socket')
            this.initializeSocketListener(token);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      console.log('Socket disconnecting')
      this.socket.disconnect()
    }
  }

  render() {
    if (this.props.loading) return (<LoadingComponent />);
    else return (
      <div className="App">
        {/* Header */}
        {this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? <Header history= {this.props.history} location={this.props.location} title={this.state.title} logout={this.stateHandler} /> : ''}

        {/* Main body */}
        <Switch>

          <Route exact path='/' render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ?
            <Redirect to='/programs' /> : <Login parentState={this.state} parentProps={this.props} initializeSocketListener={this.initializeSocketListener} /> )} />

          <Route exact path='/home' render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <Home {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.PROGRAMS)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <UserPrograms {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.PROGRAM, [":p_id"])} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <UserProgram {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.MODULES, [":p_id", ":m_id"])} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <UserModule {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.ACTIVITIES, [":p_id", ":m_id", ":a_id"])} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <UserActivity {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.TASKS, [":p_id", ":m_id", ":t_id"])} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <UserTask {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {CONSTANTS.CALENDAR} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <ViewCalendar {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.RESOURCES)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <Resources {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.FAVOURITE_ACTIVITIES)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <FavouriteActivities {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.FAVOURITE_MODULES)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <FavouriteModules {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.TASK_SUMMARY, [":p_id", ":m_id", ":t_id"])} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <TaskSummary {...props}/> : <Redirect to='/' /> )} />

          <Route exact path= {replacePlaceHolder(CONSTANTS.NOTIFICATIONS)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
            <Notifications {...props}/> : <Redirect to='/' /> )} />

            <Route exact path= {replacePlaceHolder(CONSTANTS.PROFILE)} render={(props) => (this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? 
              <Profile {...props}/> : <Redirect to='/' /> )} />

          <Route exact path='/test' render={() => <div>Test</div>} />

          <Route render={() => <div>404 Error</div>} />

        </Switch>

        {/* Footer */}
        {this.props.loggedIn || AppHelper.isUserLocalStorageLoggedIn() ? <Footer /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loginStatus.loggedIn,
    loading: state.loginStatus.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAccessTokenLogin: (token) => dispatch(requestAccessTokenLogin(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
