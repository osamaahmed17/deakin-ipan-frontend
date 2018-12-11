import React, { Component } from 'react'
import M from "materialize-css";

class Collapsible extends Component {
  componentDidMount() {
    const options = {
      accordion: false,
    };
    M.Collapsible.init(this.Collapsible, options);
  }
  render () {
    return(
      <div className="container">
        <ul className="collapsible expandable" ref={Collapsible => { this.Collapsible = Collapsible; }}>
          {
            this.props.data.map((item, i) => {
              return (
                <li key = {i}>
                  <div className="collapsible-header"> {item.title} </div>
                  <div className="collapsible-body"> {this.props.children} </div>
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