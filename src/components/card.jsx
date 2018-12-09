import React, { Component } from 'react'



class Card extends Component {
  checkTitle = () => {
    if(!(this.props.status)) {
      return (<span className="card-title margin-bot-rm">{this.props.data.title}</span>)
    } else {
      return (
        <div className="card-title row margin-bot-rm">
          <div className="col s9 m10 l10 left-align">{this.props.data.title}</div>
          <div className="col s1 l1">{this.checkFavourite()}</div>
          <div className="goal col s1 l1">{this.goalIcon('hello', 'directions_run')}</div>
        </div>
      )
    }
  }

  checkFavourite  = (data) => {
    if (data) {
      return (
        <p className="col margin-top-rm"><i className="material-icons md-light">favorite</i> </p>
      )
    } else {
      return (<p className="col margin-top-rm"><i className="material-icons md-light md-disabled md-inactive">favorite_border</i> </p>)
    }
  }

  goalIcon = (status, goal) => {
    if (status !== null) {
      return (
        <p className="col margin-top-rm"> <i className="material-icons"> {goal} </i> </p>
      )
    } else {
      return (
        <p className="col margin-top-rm"> <i className="material-icons">tv</i> </p>
      )
    }
  }

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text sub-heading">
            {this.checkTitle()}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  } 
}

export default Card;
