import React, { Component } from 'react'
import Section from 'components/section.jsx'
import Card from 'components/card.jsx'
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
      <div className="container">
        <p>Module {this.props.match.params.m_id}</p>
        {
          module.section.map((items) => {
            return (
              <div className="section" key={module.id}>
                <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
              </div>
            )
          })
        }
        {
          module.section.map((items) => {
            return (
              <div className="activity-card" key={module.id}>
                <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id + '/activities/' + module.id}>
                  <Card data={items} p_id={items.id} />
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