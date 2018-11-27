import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      developerMode: false // Change this to false to contact API
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      emailId: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  performLogin = (e) => {
    e.preventDefault();
    if (this.state.developerMode) {
      this.props.dispatchDeveloperModeLogin();
      AppHelper.developerModeLoginUser(true);
      return;
    }
    this.props.dispatchLogin(this.state).then((response) => {
      const accessToken = response.payload.data.data.accessToken;
      AppHelper.loginUser(true, accessToken);
    });
  }

  render() {
    return (
      <div className="Login">
        <h1>
          {this.props.parentState.title}
        </h1>
        <div className='row'>
          <div className='row'>
            <div className='col s6 offset-s3'>
              <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
              <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
              <a className="waves-effect waves-light btn" onClick={this.performLogin} href="#!">
                <i className="material-icons left">cloud</i>Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin  : (data) => dispatch(requestLogin(data)),
    dispatchDeveloperModeLogin : () => dispatch(developerModeLogin())
  }
}

export default connect(null, mapDispatchToProps)(Login);
