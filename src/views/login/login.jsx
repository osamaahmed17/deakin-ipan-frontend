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
      developerMode: false, // Change this to false to contact API
      error: false,
<<<<<<< HEAD
      errorMsg: ''
=======
>>>>>>> login: New validation check
    };
  }

  errorMessage = () => {
    if(this.state.error) {
      return (
<<<<<<< HEAD
        <p><b>{this.state.errorMsg}</b></p>
=======
        <p><b>Invalid credentials!</b></p>
>>>>>>> login: New validation check
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
<<<<<<< HEAD
      return true
    } else {
      this.setState({
        error: true,
        errorMsg: "Email or password must not be empty!"
      })
      return false
=======
      this.performLogin()
    } else {
      this.setState({
        error: true
      })
>>>>>>> login: New validation check
    }
  }

  performLogin = (e) => {
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
        <h1>
          {this.props.parentState.title}
        </h1>
<<<<<<< HEAD
        <div className='row'>
          <div className='row'>
            <div className='col s6 offset-s3'>
              <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
              <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
              {this.errorMessage()}
              {
                this.props.loginLoading ? 
                  "Loading..." : 
                  <a className="waves-effect waves-light btn" id="loginButton" onClick={this.performLogin} href="#!">
                    <i className="material-icons left">cloud</i>Login
                  </a>
              }
            </div>
=======
        <div className="row">
          <div className='col s6 offset-s3'>
            <input placeholder="Email" id="email" type="email" className="validate" onChange={this.handleEmailChange} />
            <input placeholder="Password" id="password" type="password" className="validate" onChange={this.handlePasswordChange} />
            {this.errorMessage()}
            <button className="waves-effect waves-light btn" id='loginButton' onClick={this.validationCheck}>Login</button>
>>>>>>> login: New validation check
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

const mapStateToProps = (state) => {
  return {
    loginLoading : state.loginStatus.loginLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
