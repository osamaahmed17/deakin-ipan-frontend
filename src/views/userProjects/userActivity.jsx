import React, { Component } from 'react'
import Section from 'components/section.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { Link } from 'react-router-dom'

class UserActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      toggleFavourite: false,
    }
  }

  handleFavouriteClick = () => {
    this.setState({
    toggleFavourite: !this.state.toggleFavourite
    })
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
    if (!this.state.activity) return <LoadingComponent />;
    return(
      <div className="Activity container">
        <div className="main-title row">
          <p className="col s11 m11 l11 left-align title">
            <span>
              Activity {this.props.match.params.a_id}
            </span>
            <br/>
            <span className="sub-title">
              Weekly Planner Activity
            </span>
          </p>
          <i className="col s1 m1 l1 material-icons btn-flat favourite-icon" id={"activity_" + this.state.activity.id + "-favourite-icon"} style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}>favorite</i>
        </div>
        <div className="card activity-image">
        {
          this.state.activity.section.map((items, i) => {
            return (
              <div key={i+1} className="section">
                <Section data = {items} />
              </div>
            )
          })
        }
        </div>
        <div className="calendar">
        <Link to={CONSTANTS.CALENDAR}>
          <button className="waves-effect waves-light btn add-activity-to-calendar-btn" id="add-activity-to-calendar-btn">
            Add this activity to you calendar
          </button>
        </Link>
        </div>
      </div>
    )
  }
}

export default UserActivity;