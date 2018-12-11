import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: null,
    }
  }

  componentDidMount() {
    this.getResources();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getResources = () => {
    API.getResources(this.stateHandler);
  }

  checkResourcesType = (data) => {
    if(data.type === "link") {
      return (
        <div className="container justify-content">
          <a href={data.data.url}>{data.data.title}</a>
        </div>
      )
    } else if(data.type === 'text') {
      return (
        <div className="container justify-content sub-heading">
          <p>{data.data.text}</p>
        </div>
      )
    }
  }

  render() {
    let resources = this.state.resources;
    if (!this.state.resources) return <LoadingComponent />;
    return (
      <div className="resources">
        {
          resources.map((items, k) => {
            return (
              <div key={"resources_" + k}>
                {this.checkResourcesType(items)}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Resources;