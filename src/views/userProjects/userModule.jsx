import React, { Component } from 'react'
import Section from 'components/section.jsx'
import ResourcesCard from 'components/cards/resourcesCard.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import Collapsible from 'components/collapsible.jsx'

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
        <div className="title row">
          <h2 className="col s9 m9 l9 left-align">Module {this.props.match.params.m_id}: {module.title}</h2>
          <i className="material-icons col right s1 margin-top btn-flat padding-rmv" style={{opacity: this.state.toggleGoal ? '1.0' : '0.2'}} onClick={this.handleGoalClick}>directions_run</i>
          <i className="material-icons col right s1 margin-top btn-flat padding-rmv" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}>favorite</i>
        </div>
        {
          module.section.map((items, k) => {
            return (
              <div className="section" key={'section_' + k}>
                <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
              </div>
            )
          })
        }
        <div className="activity">
          <div className="row">
            <div className="col s12 left-align heading">
              Activities
            </div>
            <div className="col s12 padding-rmv">
              <Collapsible data={module.activities}  p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="activities" />
            </div>
          </div>
        </div>
        <div className="task">
          <div className="row">
            <div className="col s12 left-align heading">
              Tasks
            </div>
            <div className="col s12 padding-rmv">
              <Collapsible data={module.tasks}  p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="tasks" />
            </div>
          </div>
        </div>
        <div className="resources">
          <ResourcesCard data={module.resources} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} />
        </div>
      </div>
    )
  }
}

export default UserModule;