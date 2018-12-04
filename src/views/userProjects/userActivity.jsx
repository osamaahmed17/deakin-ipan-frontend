import React, { Component } from 'react'
import Section from 'components/section.jsx'
import { Link } from 'react-router-dom'
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
      <div>
        <p>Activity {this.props.match.params.a_id}</p>
        {
          activity.data.questionSet.map((items, i) => {
            return (
              <div key={i+1}>
                <Link to={'/program/' + this.props.match.params.p_id + '/module/' + this.props.match.params.m_id + '/activity/'+ this.props.match.params.a_id + '/task/'+ (i+1)}>
                  <Section data = {items} />
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserActivity;