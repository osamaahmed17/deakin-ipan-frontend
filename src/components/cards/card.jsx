import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Card extends Component {
  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text">
            <span className="card-title sub-heading"> <b>{this.props.data.title}</b> </span>
          </div>
          <Link to={'/programs/' + this.props.data.id}>
            <p className="justify-content text-color-white description">{this.props.data.shortDescription}</p>
          </Link>
          <div className="row" style={{marginBottom:"0px"}}>
            <p className="col right">Completed Modules {this.props.data.progress === '' ? 0 : this.props.data.progress}/{this.props.data.total}</p>
          </div>
          <div className="progress">
            <div className="determinate white" style={{width: (this.props.data.progress === '' ? 0 : ((this.props.data.progress*100)/this.props.data.total)) +"%"}}></div>
          </div>
        </div>
      </div>
    )
  } 
}

export default Card;
