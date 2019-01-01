import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class FavouriteActivitiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFavourite: this.props.data.favourite,
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
    console.log(this.props)
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text title row">
            <div className="col sub-heading s11 m10 l10 left-align"> <b>Module {this.props.data.moduleId}: {this.props.data.title}</b> </div>
            <i className="material-icons btn-flat padding-rmv" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.ACTIVITIES,[this.props.p_id, this.props.data.moduleId, this.props.data.id])}>
            <p className="col s12 justify-content text-color-white "> {this.props.data.shortDescription} </p>
          </Link>
          <div className="row right-align status"> {this.completionStatus(this.props.favourite)}</div>
        </div>
      </div>
    )
  } 
}

export default FavouriteActivitiesCard;
