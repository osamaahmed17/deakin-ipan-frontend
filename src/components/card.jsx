import React from 'react'

const Card = () => {
  console.log("Card Component")
  return (
    <div className="col s12 m6">
      <div className={"card blue-grey darken-1 card_" + this.props.id}>
        <div className="card-content white-text">
          <span className="card-title">{this.props.data.title}</span>
          <p>{this.props.data.descriptionShort}</p>
        </div>
        <div className="card-action">
          <a href="#!">Visit</a>
        </div>
      </div>
    </div>
  )
}

export default Card;