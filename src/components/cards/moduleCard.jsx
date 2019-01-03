import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

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
        <div className={"card-panel card_" + this.props.data.id}>
          <div className="card-content">
            <div className="row">
              <div className="col s10 m10 l10 card-title left-align">
                {this.props.data.title}
              </div>
              <i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{opacity: this.state.toggleGoal ? '1.0' : '0.2'}} onClick={this.handleGoalClick}> directions_run </i>
              <i className="col s1 m1 l1 material-icons btn-flat favourite-icon" id={"module_" + this.props.data.id + "-favourite-icon"} style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.MODULES,[this.props.p_id, this.props.data.id])}>
            <p className="module-description" id={"module_" + this.props.data.id + "-description"}>{this.props.data.shortDescription}</p>
          </Link>
          <div className="status row">
            <p className="col right module-status" id={"module_" + this.props.data.id + "-status"} style={{marginBottom:"0px"}}> {this.props.data.status} </p>
          </div>
        </div>
      </div>
    )
  } 
}

export default ModuleCard;
