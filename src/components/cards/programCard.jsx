import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class ProgramCard extends Component {
  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel card_" + this.props.data.id}>
          <div className="card-content">
            <span className="card-title"> {this.props.data.title} </span>
          </div>
          <Link to={replacePlaceHolder(CONSTANTS.PROGRAM, [this.props.data.id])}>
            <img className="responsive-img" src="https://i.imgur.com/vAPuzqe.jpg" alt={"image_" + this.props.data.id} />
            <p className="program-description" id={"program_" + this.props.data.id + "-description"}>{this.props.data.description}</p>
          </Link>
          <div className="progress">
            <div className="determinate white" style={{ width: (this.props.data.progress === '' ? 0 : ((this.props.data.progress * 100) / this.props.data.total)) + "%" }}></div>
          </div>
          <div className="row" style={{ marginBottom: "0px" }}>
            <p className="col right program-progress">Completed Modules {this.props.data.progress === '' ? 0 : this.props.data.progress}/{this.props.data.total}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProgramCard;
