import React, { Component } from 'react'



class Card extends Component {
  checkTitle = () => {
    if(!(this.props.status)) {
      return (<span className="card-title margin-bot-rm">{this.props.data.title}</span>)
    } else {
      return (
        <div className="card-title row margin-bot-rm">
          <div className="col s8 left-align">{this.props.data.title}</div>
          <div className="col s2">{this.checkFavourite ()}</div>
        </div>
      )
    }
  }

  checkFavourite  = (data) => {
    if (data) {
      return (<p className="col margin-top-rm"><i className="material-icons md-light">favorite</i> </p>)
    } else {
      return (<p className="col margin-top-rm"><i className="material-icons md-light md-disabled md-inactive">favorite_border</i> </p>)
    }
  }

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text">
            {this.checkTitle()}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  } 
}

export default Card;
