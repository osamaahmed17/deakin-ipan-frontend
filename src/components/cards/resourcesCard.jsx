import React, { Component } from 'react'

class ModuleCard extends Component {

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className="card-panel">
          <div className="card-content">
            <div className="card-title left-align"> {this.props.data.title} </div>
          </div>
          <div className="description">{this.props.data.shortDescription}</div>
        </div>
      </div>
    )
  } 
}

export default ModuleCard;
