import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleGoal: this.props.data.goalStatus,
      toggleFavourite: this.props.data.favouriteStatus,
    }
    this.handleGoalClick = this.handleGoalClick.bind(this)
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  handleGoalClick() {
    this.setState(state => ({
      toggleGoal: !state.toggleGoal
    }))
  }

  handleFavouriteClick() {
    this.setState(state => ({
      toggleFavourite: !state.toggleFavourite
    }))
  }

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className="card-panel">
          <div className="card-content white-text">
            <div className="row">
              <div className="col card-title sub-heading s9 m10 l10 left-align"> <b>{this.props.data.title}</b> </div>
              <i className="material-icons btn-flat padding-rmv" style={{opacity: this.state.toggleGoal ? '1.0' : '0.2'}} onClick={this.handleGoalClick}> directions_run </i>
              <i className="material-icons btn-flat padding-rmv" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <Link to={'/programs/' + this.props.p_id + '/modules/' + this.props.data.id }>
            <p className="justify-content text-color-white description">{this.props.data.shortDescription}</p>
          </Link>
          <div className="row margin-bot-rm">
            <p className="col right" style={{marginBottom:"0px"}}> {this.props.data.status} </p>
          </div>
        </div>
      </div>
    )
  } 
}

export default ModuleCard;
