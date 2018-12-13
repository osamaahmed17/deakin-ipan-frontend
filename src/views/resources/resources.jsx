import React, { Component } from 'react'
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
    API.getResources(this.stateHandler, this.props.match.params.p_id, this.props.match.params.m_id);
  }

  checkResourcesType = (data, key) => {
    if(data.type === "link") {
      return (
        <div className="container justify-content">
          <a href={data.data.url}> <p> {data.data.title} </p> </a>
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
        <h2 classnName="left">Resoures</h2>
        {
          resources.map((items, key) => {
            return (
              <div key={"resources_" + key}>
                {this.checkResourcesType(items, key)}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Resources;