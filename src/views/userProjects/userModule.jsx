import React, { Component } from 'react'
import Section from 'components/section.jsx'
import { Link } from 'react-router-dom'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading';

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: null
    } 
  }

  componentDidMount() {
    this.getModule();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getModule = () => {
    API.getModule(this.stateHandler, this.props.match.params.p_id, this.props.match.params.m_id);
  }

  render () {
    let module = this.state.module;
    if (!this.state.module) return <LoadingComponent />;
    return(
      <div>
        <p>Module {this.props.match.params.m_id}</p>
        {
          module.section.map((items) => {
            return (
              <div key={module.id}>
                <Link to={'/program/' + this.props.match.params.p_id + '/module/' + this.props.match.params.m_id + '/activity/' + module.id}>
                  <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserModule;