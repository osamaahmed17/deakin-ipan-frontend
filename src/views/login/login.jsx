import React, { Component } from 'react';
import AppHelper from "helpers/AppHelper.js";
import { connect } from 'react-redux';
import { requestLogin, developerModeLogin } from 'actions';
import LoadingComponent from 'components/loading/loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      developerMode: false, // Change this to false to contact API
      error: false,
      errorMsg: ''
    };
  }

  errorMessage = () => {
    if(this.state.error) {
      return (
        <p className="error-message" id="error-message">{this.state.errorMsg}</p>
      )
    }
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

  validationCheck = () => {
    let email = this.state.emailId
    let password = this.state.password
    if ((email.length > 0) && (password.length > 0)) {
      return true
    } else {
      this.setState({
        error: true,
        errorMsg: "Email or password must not be empty!"
      })
      return false
    }
  }

  performLogin = (e) => {
    e.preventDefault();
    if (this.state.developerMode) {
      this.props.dispatchDeveloperModeLogin();
      AppHelper.developerModeLoginUser(true);
      this.props.initializeSocketListener(AppHelper.getUserAccessToken());
      return;
    }
    if (!this.validationCheck()) return;
    this.props.dispatchLogin(this.state).then((response) => {
      if (
      response && response.payload && response.payload.data &&
      response.payload.data.data && response.payload.data.data.accessToken
      ) {
        const accessToken = response.payload.data.data.accessToken;
        AppHelper.loginUser(true, accessToken);
        this.props.initializeSocketListener(accessToken);
      } else {
        this.setState({
          error: true,
          errorMsg: "Invalid credentials!"
        })
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <h2>
          {this.props.parentState.title}
        </h2>
        <div className='row'>
          <form id="login-form col s12">
            <div className="row">
              <div className='col s8 offset-s2 login-credentials-div'>
                {/* Put placeholder if you remove <label> tag */}
                <div className="input-field">
                  <label class="active" for="email">Email</label>
                  <input id="email" type="email" className="validate login-form-styling" onChange={this.handleEmailChange} />
                </div>
                <div className="input-field">
                  <label class="active" for="password">Password</label>
                  <input id="password" type="password" className="validate login-form-styling" onChange={this.handlePasswordChange} />
                </div>
                {this.errorMessage()}
              </div>
              <div className='button-container'>
                {
                  this.props.loginLoading ?
                    <LoadingComponent /> :
                    <button className="col s8 offset-s2 btn waves-effect waves-light login-button" id="login-button" onClick={this.performLogin}>Login</button>
                }
              </div>
            </div>
          </form>
        </div>
        <div className="dev-message">
          <p className="center-align">
            Developed by Deakin Launchpad
          </p>
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

const mapStateToProps = (state) => {
  return {
    loginLoading : state.loginStatus.loginLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
