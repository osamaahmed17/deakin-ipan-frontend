import React, { Component } from 'react'
import Section from 'components/section.jsx'
// import ResourcesCard from 'components/cards/resourcesCard.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import Collapsible from 'components/collapsible.jsx'
var _ = require('underscore')

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: null,
      toggleFavourite: '',
    }
  }

  handleFavouriteClick = () => {
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

  // Display goal icon
  // If true opacity:1 else opacity: 0.2
  goalIcon = () => {
    if (this.state.module.goalStatus) {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{ opacity: '1.0' }} onClick={this.handleGoalClick}> directions_run </i>)
    } else {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{ opacity: '0.2' }} onClick={this.handleGoalClick}> directions_run </i>)
    }
  }

  checkModulesLength = () => {
    if (!_.isEqual(this.state.module.activities.length, 0)) {
      return (
        <div className="container">
          <Collapsible data={this.state.module.tasks} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="tasks" />
        </div>
      )
    } else {
      return (
        <div className="empty-content container">
          No module available.
        </div>
      )
    }
  }

  checkTasksLength = () => {
    if (!_.isEqual(this.state.module.tasks.length, 0)) {
      return (
        <div className="container">
          <Collapsible data={this.state.module.tasks} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="tasks" />
        </div>
      )
    } else {
      return (
        <div className="empty-content container">
          No tasks available.
        </div>
      )
    }
  }

  render() {
    if (!this.state.module) return <LoadingComponent />;
    return (
      <div className="Module container">
        <div className="main-title row">
          <p className="col s10 m10 l10 left-align title">Module {this.props.match.params.m_id}: {this.state.module.title}</p>
          {this.goalIcon()}
          <i className="col s1 m1 l1 material-icons favourite-icon btn-flat" style={{ opacity: this.state.toggleFavourite ? '1.0' : '0.2' }} onClick={this.handleFavouriteClick}>favorite</i>
        </div>
        <div className="card-panel">
          {
            this.state.module.sections.map((items, k) => {
              return (
                <div className="section" key={'section_' + k}>
                  <Section data={items} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} />
                </div>
              )
            })
          }
          <div className="activities">
            <div className="row">
              <div className="left-align collaps-title">
                Activities
            </div>
              <div className="container">
                <Collapsible data={this.state.module.activities} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="activities" />
              </div>
            </div>
          </div>
          <div className="tasks">
            <div className="row">
              <div className="left-align collaps-title">
                Tasks
            </div>
              {this.checkTasksLength()}
            </div>
        </div>
      </div>
        {/* <div className="resources">
          <ResourcesCard data={this.state.module.resources} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} />
        </div>
        {/* In app back button. Modules page to modules list page */}
      </div>
    )
  }
}

export default UserModule;
