import React, { Component } from 'react'
import Section from 'components/section.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      toggleFavourite: '',
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  handleFavouriteClick() {
    this.setState(state => ({
      toggleFavourite: !state.toggleFavourite
    }))
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
        <div className="row">
          <h2 className="col s11 m11 l11 left-align heading">
            Activity {this.props.match.params.a_id}
            <br/>
            Weekly Planner Activity
          </h2>
          <i className="material-icons margin-top btn-flat padding-rmv" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}>favorite</i>
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
          <a className="waves-effect waves-light btn btn-width-100" href={'/calendar/' + this.props.match.params.p_id}> Add this activity to you calendar </a>
        </div>
      </div>
    )
  }
}

export default UserActivity;