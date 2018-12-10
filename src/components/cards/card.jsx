import React, { Component } from 'react'

class Card extends Component {
  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text">
            <span className="card-title sub-heading"> {this.props.data.title} </span>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  } 
}

export default Card;
