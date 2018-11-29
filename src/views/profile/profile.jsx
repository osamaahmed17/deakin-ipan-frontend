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
      <div>
        <h1>My Profile</h1>
        <p>
          First Name: {profile.first_name}
        </p>
        <p>
          Last Name: {profile.last_name}
        </p>
        <p>
          DOB: {profile.dob}
        </p>
        <p>
          Mobile: {profile.mobile}
        </p>
        <p>
          Email: {profile.email}
        </p>
        <p>
          Gender: {profile.gender}
        </p>
      </div>
    );
  }
}

export default Profile;
