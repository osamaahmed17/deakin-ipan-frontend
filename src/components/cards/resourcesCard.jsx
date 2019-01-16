import React, { Component } from 'react'

class ModuleCard extends Component {

  render() {
    return (
      <div className="col s12 m12 l6 offset-l3">
        <div className="card-panel" style={{ padding: '15px' }}>
          <div className="card-content">
            <div className="card-title left-align"> Resources </div>
          </div>
          <div className="divider"></div>
          <div className="description">
            <p>
              This is resources card.
            </p>
          </div>
        </div>
      </div>
    )
  } 
}

export default ModuleCard;
