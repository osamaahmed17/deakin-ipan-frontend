import React, { Component } from 'react'

class ModuleCard extends Component {

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className={"card-panel"}>
          <div className="card-content white-text">
            <div className="row">
              <div className="col card-title sub-heading s8 m10 l10 left-align"> <b>{this.props.data.title}</b> </div>
              <div className="col card-title s2 m2 l2 right-align"> {this.props.data.status} </div>
            </div>
          </div>
          <div className="justify-content text-color-white description">{this.props.data.shortDescription}</div>
        </div>
      </div>
    )
  } 
}

export default ModuleCard;
