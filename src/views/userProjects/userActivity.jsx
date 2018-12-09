import React, { Component } from 'react'
import Section from 'components/section.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null
    } 
  }

  componentDidMount() {
    this.getActivity();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getActivity = () => {
    API.getActivity(this.stateHandler, this.props.match.params.p_id, this.props.match.params.m_id, this.props.match.params.a_id);
  }

  render () {
    let activity = this.state.activity;
    if (!this.state.activity) return <LoadingComponent />;
    return(
      <div className="container">
        <p>Activity {this.props.match.params.a_id}</p>
        <div className="card section">
        {
          activity.section.map((items, i) => {
            return (
              <div key={i+1} className="section">
                <Section data = {items} />
              </div>
            )
          })
        }
        </div>
        <div className="calendar">
          <a className="waves-effect waves-light btn" href={'/calendar/' + this.props.match.params.p_id}> Add this activity to you calendar </a>
        </div>
      </div>
    )
  }
}

export default UserActivity;