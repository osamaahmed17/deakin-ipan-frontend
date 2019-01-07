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
        <p className="error-message" id="error-message"><b>{this.state.errorMsg}</b></p>
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
          <form id="login-form">
            <div className='col s8 offset-s2 login-credentials-div'>
              <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
              <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
              {this.errorMessage()}
            </div>
            <div className='button-container'>
              {
                this.props.loginLoading ? 
                  <LoadingComponent /> :
                  <button className="col s8 offset-s2 btn waves-effect waves-light login-button" id="login-button" onClick={this.performLogin}>Login</button>
              }
            </div>
          </form>
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