import React, { Component } from 'react';
import API from 'helpers/api.js';
import LoadingComponent from 'components/loading/loading.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    }

  }

  componentDidMount() {
    this.getProfile();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getProfile = () => {
    API.getProfile(this.stateHandler);
  }

  render() {
    let profile = this.state.profile;
    if (!this.state.profile) return <LoadingComponent />;
    return (
      <div className="Profile container">
        <p className="main-title left-align">My Profile</p>
        <div className="col s12 m6 l6 center-align">
          <div className="card">
            <div className="card-content">
              <div className="user-profile-image left-align">
                <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="user-img circle responsive-img" />
              </div>
              <div className="row">
                <div className="col s5 left-align label"> First Name: </div>
                <div className="col s7 left-align first-name"> {profile.firstName} </div>
              </div>
              <div className="row">
                <div className="col s5 left-align label"> Last Name: </div>
                <div className="col s7 left-align last-name"> {profile.lastName} </div>
              </div>
              <div className="row">
                <div className="col s5 left-align label"> Date of Birth: </div>
                <div className="col s7 left-align dob"> {profile.dob} </div>
              </div>
              <div className="row">
                <div className="col s5 left-align label"> Mobile: </div>
                <div className="col s7 left-align mobile"> {profile.mobile} </div>
              </div>
              <div className="row">
                <div className="col s5 left-align label"> Email: </div>
                <div className="col s7 left-align email"> {profile.email} </div>
              </div>
              <div className="row">
                <div className="col s5 left-align label"> Gender: </div>
                <div className="col s7 left-align gender"> {profile.gender} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
