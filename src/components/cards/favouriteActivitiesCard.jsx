import React, { Component } from 'react'

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
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text title row">
            <div className="col sub-heading s11 m10 l10 left-align"> <b>Module {this.props.data.moduleId}: {this.props.data.title}</b> </div>
            <i className="material-icons btn-flat padding-rmv" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
          </div>
          <div className="row description">
            <div className="col s12 left-align"> {this.props.data.shortDescription} </div>
          </div>
          <div className="row right-align status"> {this.completionStatus(this.props.favourite)}</div>
        </div>
      </div>
    )
  } 
}

export default FavouriteActivitiesCard;
