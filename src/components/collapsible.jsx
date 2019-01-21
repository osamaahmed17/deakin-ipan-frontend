import React, { Component } from 'react'
import M from "materialize-css";
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'

class Collapsible extends Component {
  componentDidMount() {
    const options = {
      accordion: false,
    };
    M.Collapsible.init(this.Collapsible, options);
  }
  checkContentType = (contentType, data_id) => {
    if (contentType === 'activities') {
      return replacePlaceHolder(CONSTANTS.ACTIVITIES, [this.props.p_id, this.props.m_id, data_id])
    } else if (contentType === 'tasks') {
      return replacePlaceHolder(CONSTANTS.TASKS, [this.props.p_id, this.props.m_id, data_id])
    }
  }

  render() {
    return (
      <ul className="collapsible expandable" ref={Collapsible => { this.Collapsible = Collapsible; }}>
        {
          this.props.data.map((items, key) => {
            return (
              <li key={key}>
                <div className="collapsible-header">
                  <span className="left-align collapsible-title sub-heading"> {items.title} </span>
                  <i className="material-icons right">expand_more</i>
                  <span className="right status"> {items.status} </span>
                </div>
                <div className="collapsible-body description">
                  <Link to={this.checkContentType(this.props.contentType, items.id)}>
                    {items.shortDescription}
                  </Link>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default Collapsible;