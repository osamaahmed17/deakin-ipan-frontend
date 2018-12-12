import React, { Component } from 'react'
import M from "materialize-css";
import { Link } from 'react-router-dom'

class Collapsible extends Component {
  componentDidMount() {
    const options = {
      accordion: false,
    };
    M.Collapsible.init(this.Collapsible, options);
  }
  checkContentType = (data) => {
    if(data === 'activity') {
      return true
    } else if (data === 'task') {
      return false
    }
  }
  
  render () {
    return(
      <div className="container">
        <ul className="collapsible expandable" ref={Collapsible => { this.Collapsible = Collapsible; }}>
          {
            this.props.data.map((item, i) => {
              return (
                <li key = {i}>
                  <div className="collapsible-header">
                    {item.title}
                    <i className="material-icons right-align">expand_more</i> 
                  </div>
                  <div className="collapsible-body justify-content">
                    <Link to={'/programs/' + this.props.p_id + '/modules/' + this.props.m_id + '/' + this.props.contentType + '/' + item.id}>
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