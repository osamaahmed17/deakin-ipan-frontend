import React, { Component } from 'react'

class Card extends Component {
  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.id}>
          <div className="card-content white-text">
            <span className="card-title">{this.props.data.title}</span>
            <p>{this.props.data.shortDesc}</p>
          </div>
          <div className="row" style={{marginBottom:"0px"}}>
            <p className="col left">Lesson Progress</p>
            <p className="col right">{this.props.data.progress === ''? 0 : this.props.data.progress}%</p>
          </div>
          <div className="progress">
            <div className="determinate" style={{width: (this.props.data.progress === ''? 0 : this.props.data.progress) +"%"}}></div>
          </div>
          <div className="card-action">
            <a className="flat-btn" href="#!">Visit</a>
          </div>
        </div>
      </div>
    )
  } 
}

export default Card;
