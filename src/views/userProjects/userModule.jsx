import React, { Component } from 'react'
import Section from 'components/section.jsx'
import ModuleCard from 'components/cards/moduleCard.jsx'
import { Link } from 'react-router-dom'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: null,
      toggleGoal: '',
      toggleFavourite: '',
    }
    this.handleGoalClick = this.handleGoalClick.bind(this)
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  handleGoalClick() {
    this.setState(state => ({
      toggleGoal: !state.toggleGoal
    }))
  }

  handleFavouriteClick() {
    this.setState(state => ({
      toggleFavourite: !state.toggleFavourite
    }))
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
        <div className="icons">
          <p className="col right" style={{opacity: this.state.toggleGoal ? '1.0' : '0.2'}} onClick={this.handleGoalClick}> <i className="material-icons iconBox">{module.goal.type}</i> </p>
          <p className="col right" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> <i className="material-icons md-light iconBox">{module.favourite.type}</i> </p>
        </div>
        <div className="title row">
          <p className="col s12 m12 l12 left-align sub-heading">{module.title}</p>
          <p className="col s12 m12 l12 left-align">Module {this.props.match.params.m_id}: Module Name will come here</p>
        </div>
        <div className="article">
          {
            module.section.map((items, k) => {
              return (
                <div className="section" key={'section_' + k}>
                  <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
                </div>
              )
            })
          }
        </div>
        <div className="activites">
          {
            module.activities.map((items, x) => {
              return (
                <div className="activity-card" key={'activity_' + x}>  
                  <ModuleCard data={items} p_id={items.id} status= {false}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id + '/activities/' + items.id}>
                      <p className="justify-content text-color-white description">{items.shortDescription}</p>
                    </Link>
                  </ModuleCard>
                </div>
              )
            })
          }
        </div>
        <div className="tasks">
          {
            module.tasks.map((items, i) => {
              return (
                <div className="activity-card" key={'task_' + i}>  
                  <ModuleCard data={items} p_id={items.id} status= {false}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id + '/tasks/' + items.id}>
                      <p className="justify-content text-color-white description">{items.shortDescription}</p>
                    </Link>
                  </ModuleCard>
                </div>
              )
            })
          }
        </div>
        <div className="resources">
          <ModuleCard data={module.resources}>
            <Link to={'/resources'}>
              <div className="justify-content text-color-white description">{module.resources.shortDescription}</div>
            </Link>
          </ModuleCard>
        </div>
      </div>
    )
  }
}

export default UserModule;