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
        <div className="icons row">
          <p className="col s8 m10 l10 left-align sub-heading">{module.title}</p>
          <p className="col s2 m2 l2 right"> <i className="material-icons">favorite_border</i> </p>
          <p className="col s2 m2 l2 right"> <i className="material-icons md-light">directions_run</i> </p>
        </div>
        <p>Module {this.props.match.params.m_id}: Module Name will come here</p>
          {
            module.section.map((items) => {
              return (
                <div className="section" key={module.id}>
                  <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
                </div>
              )
            })
          }
        <div className="activites">
          {
            module.activities.map((items, x) => {
              return (
                <div className="activity-card" key={x}>  
                  <Card data={items} p_id={items.id} status= {false}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id + '/activities/' + items.id}>
                      <p className="justify-content text-color-white">{items.shortDescription}</p>
                    </Link>
                    <div className="row margin-bot-rm">
                      <p className="col right" style={{marginBottom:"0px"}}>Status: {items.status}</p>
                    </div>
                  </Card>
                </div>
              )
            })
          }
        </div>
        <div className="tasks">
          {
            module.tasks.map((items, i) => {
              return (
                <div className="activity-card" key={i}>  
                  <Card data={items} p_id={items.id} status= {false}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id + '/tasks/' + items.id}>
                      <p className="justify-content text-color-white">{items.shortDescription}</p>
                    </Link>
                    <div className="row margin-bot-rm">
                      <p className="col right" style={{marginBottom:"0px"}}>Status: {items.status}</p>
                    </div>
                  </Card>
                </div>
              )
            })
          }
        </div>
        <div className="resources">
          <Card data={'Resources'} status= {false}>
          {/* requires redirect of resources to url */}
          {/* Remove hard coded description */}
            <Link to={'/'}>
              <p className="justify-content text-color-white">Module specific external resources</p>
            </Link>
          </Card>
        </div>
      </div>
    )
  }
}

export default UserModule;