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
  checkContentType = (data, data_id) => {
    console.log(data_id)
    if(data === 'activities') {
      return replacePlaceHolder(CONSTANTS.ACTIVITIES, [this.props.p_id, this.props.m_id, data_id])
    } else if (data === 'tasks') {
      return replacePlaceHolder(CONSTANTS.TASKS, [this.props.p_id, this.props.m_id, data_id])
    }
  }
  
  render () {
    // {'/programs/' + this.props.p_id + '/modules/' + this.props.m_id + '/' + this.props.contentType + '/' + item.id}
    return(
      <div>
        <ul className="collapsible expandable" ref={Collapsible => { this.Collapsible = Collapsible; }}>
          {
            this.props.data.map((item, i) => {
              return (
                <li key = {i}>
                  <div className="collapsible-header">
                    <span className="left-align sub-heading"> {item.title} </span>
                    <i className="material-icons right">expand_more</i>
                    <span className="right"> {item.status} </span>
                  </div>
                  <div className="collapsible-body justify-content description">
                    <Link to={this.checkContentType(this.props.contentType, i+1)}>
                        {item.shortDescription}
                      </Link>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Collapsible;