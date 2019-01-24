import React, { Component } from 'react'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'
import track from 'react-tracking'
import TrackedLink from 'tracking/components/trackedLink.jsx'
import API from 'helpers/api.js'

class ModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteStatus: this.props.data.favouriteStatus,
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  // Display goal icon
  // If true opacity:1 else opacity: 0.2
  goalIcon = () => {
    if(this.props.data.goalStatus) {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{opacity: '1.0'}} onClick={this.handleGoalClick}> directions_run </i> )
    } else {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{opacity: '0.2'}} onClick={this.handleGoalClick}> directions_run </i> )
    }
  }

  handleFavouriteClick = () => {
    // API call for toggling favourite icon
    API.toggleFavouriteModule(this.props.p_id, this.props.data.id, this.stateHandler, this.state.favouriteStatus)
  }

  stateHandler = (state) => {
    this.setState(state);
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
              { this.goalIcon() }
              <i className="col s1 m1 l1 material-icons btn-flat favourite-icon" id={"module_" + this.props.data.id + "-favourite-icon"} style={{ opacity: this.state.favouriteStatus ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <TrackedLink to={replacePlaceHolder(CONSTANTS.MODULES,[this.props.p_id, this.props.data.id])}>
            <p className="module-description" id={"module_" + this.props.data.id + "-description"}>{this.props.data.shortDescription}</p>
          </TrackedLink>
          <div className="divider"></div>
          <div className="status row">
            <p className="col right module-status" id={"module_" + this.props.data.id + "-status"} style={{marginBottom:"0px"}}> {this.props.data.status} </p>
          </div>
        </div>
      </div>
    )
  } 
}

export default track((props) => {
  return {
    url: window.location.pathname
  }
})(ModuleCard);
