import React, { Component } from 'react'
import M from "materialize-css";
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { replacePlaceHolder } from 'helpers/urlHelper.js'
var _ = require('underscore')

class Collapsible extends Component {
  componentDidMount() {
    const options = {
      accordion: false,
    };
    M.Collapsible.init(this.Collapsible, options);
  }

  checkContentType = (contentType, data_id) => {
    if (contentType === "activities") {
      return replacePlaceHolder(CONSTANTS.ACTIVITIES, [this.props.p_id, this.props.m_id, data_id])
    } else if (contentType === "tasks") {
      return replacePlaceHolder(CONSTANTS.TASKS, [this.props.p_id, this.props.m_id, data_id])
    }
  }

  render() {
    return (
      <ul className="collapsible expandable" ref={Collapsible => { this.Collapsible = Collapsible; }}>
        <li>
          <div className="collapsible-header">
            <span className="left-align collapsible-title"> {this.props.contentType} </span>
          </div>
          <div className="collapsible-body">
            {_.isEmpty(this.props.data) ? <div> Nothing new.</div> : this.props.data.map(items => {
              return (
                <div className="row" key={items.id}>
                  <span className="col s8">
                    <label>
                      <input type="checkbox" disabled="disabled" checked={_.isEqual(items.status, CONSTANTS.STATUS.COMPLETED) ? "checked" : ""}/>
                      <span className="title">{items.title}</span>
                    </label>
                  </span>
                  <span className="col s4 right-align">
                    <Link to={this.checkContentType(this.props.contentType, items.id)} id={"start-" + this.props.contentType + items.id} className={"start-" + this.props.contentType + items.id}>
                      Start <i className="material-icons">chevron_right</i>
                    </Link>
                  </span>
                </div>
              )
            })}
              {/* <Link to={this.checkContentType(this.props.contentType, items.id)}>
                {items.shortDescription}
              </Link> */}
          </div>
        </li>
      </ul>
    )
  }
}

export default Collapsible;