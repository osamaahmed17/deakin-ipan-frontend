import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class FavouriteActivitiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFavourite: true,
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  completionStatus(status) {
    if(status === true) {
      return 'Complete'
    } else {
      return 'Incomplete'
    }
  }

  handleFavouriteClick() {
    this.setState(state => ({
      toggleFavourite: !state.toggleFavourite
    }))
  }

  render() {
    console.log(this.props.data)
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className="card-panel">
          <div className="card-content">
            <div className="row">
              <div className="col s11 m11 l11 card-title left-align"> Module {this.props.data.module.id}: {this.props.data.module.title} </div>
              <i className="col s1 m1 l1 material-icons btn-flat" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.ACTIVITIES,[this.props.data.program.id, this.props.data.module.id, this.props.data.activity.id])}>
            <p className="col s12 favourite-activity-description"> {this.props.data.activity.shortDescription} </p>
          </Link>
          <div className="row right-align favourite-activity-status">
            {this.completionStatus(this.props.favourite)}
          </div>
        </div>
      </div>
    )
  } 
}

export default FavouriteActivitiesCard;
