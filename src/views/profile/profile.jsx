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
    if (!this.state.profile) return <LoadingComponent/>;
    return (
      <div className="Profile">
        <div className="container row">
          <h2 className="main-title left-align">My Profile</h2>
        </div>
        <img src="https://imgur.com/9EHx6W8.png" alt="Avatar" className="user-img circle responsive-img"/>
        <div className="container row">
          <div className="col s4 left-align"> First Name: </div>
          <div className="col s8 left-align first-name"> {profile.firstName} </div>
        </div>
        <div className="container row">
          <div className="col s4 left-align"> Last Name: </div>
          <div className="col s8 left-align last-name"> {profile.lastName} </div>
        </div>
        <div className="container row">
          <div className="col s4 left-align"> Date of Birth: </div>
          <div className="col s8 left-align dob"> {profile.dob} </div>
        </div>
        <div className="container row">
          <div className="col s4 left-align"> Mobile: </div>
          <div className="col s8 left-align mobile"> {profile.mobile} </div>
        </div>
        <div className="container row">
          <div className="col s4 left-align"> Email: </div>
          <div className="col s8 left-align email"> {profile.email} </div>
        </div>
        <div className="container row">
          <div className="col s4 left-align"> Gender: </div>
          <div className="col s8 left-align gender"> {profile.gender} </div>
        </div>
      </div>
    );
  }
}

export default Profile;
