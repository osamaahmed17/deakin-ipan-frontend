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
        <p></p>
        <div className="row">
          <div className="col s11 m10 l10 left-align heading">
            Activity {this.props.match.params.a_id}
            <br/>
            Weekly Planner Activity
          </div>
          <div className="col s1 m2 l2 right"> <i className="material-icons">favorite_border</i> </div>
        </div>
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