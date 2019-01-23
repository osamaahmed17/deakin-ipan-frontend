import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'
import API from 'helpers/api.js'

class FavouriteModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteStatus: true,
    }
  }

  handleFavouriteClick = () => {
    API.toggleFavouriteModule(this.props.data.program.id, this.props.data.module.id, this.stateHandler, this.state.favouriteStatus)
  }
  
  stateHandler = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className="card-panel">
          <div className="card-content">
            <div className="row">
              <div className="col s10 m10 l10 card-title left-align"> Program {this.props.data.program.id}: {this.props.data.program.title} </div>
              <i className="col s1 m1 l1 material-icons btn-flat goal-icon"> directions_run </i>
              <i className="col s1 m1 l1 material-icons btn-flat favourite-icon" id={"favourite-module_" + this.props.data.programId + "-favourite-icon"} style={{ opacity: this.state.favouriteStatus ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            </div>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.MODULES,[this.props.data.program.id, this.props.data.module.id])}>
            <p className="favourite-module-description" id={"favourite-module_" + this.props.data.module.id + "-description"}>{this.props.data.module.shortDescription}</p>
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
