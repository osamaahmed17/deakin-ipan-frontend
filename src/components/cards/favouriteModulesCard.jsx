import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class FavouriteModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleFavourite: this.props.data.favouriteStatus,
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
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
          <div className="card-content">
            <div className="row">
              <div className="col s10 m10 l10 card-title left-align"> Program {this.props.data.programId}: {this.props.data.title} </div>
              <i className="col s1 m1 l1 material-icons btn-flat goal-icon"> directions_run </i>
              <i className="col s1 m1 l1 material-icons btn-flat favourite-icon" id={"favourite-module_" + this.props.data.programId + "-favourite-icon"} style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.MODULES,[this.props.data.programId, this.props.data.id])}>
            <p className="favourite-module-description" id={"favourite-module_" + this.props.data.programId + "-description"}>{this.props.data.shortDescription}</p>
          </Link>
          <div className="row right-align favourite-module-status">
            {this.props.data.status}
          </div>
        </div>
      </div>
    )
  } 
}

export default FavouriteModuleCard;
