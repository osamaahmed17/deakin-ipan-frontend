import React, { Component } from 'react'

class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleGoal: '',
      toggleFavourite: '',
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
              <div className="col card-title sub-heading s9 m10 l10 left-align"> {this.props.data.title} </div>
              <div className="col s1 m1 l1" style={{opacity: this.state.toggleGoal ? '1.0' : '0.2'}} onClick={this.handleGoalClick}> <p className="col margin-top-rm"> <i className="material-icons iconBox"> directions_run </i> </p> </div>
              <div className="col s1 m1 l1" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> <p className="col margin-top-rm"> <i className="material-icons iconBox"> favorite </i> </p> </div>
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  } 
}

export default ProgramCard;
