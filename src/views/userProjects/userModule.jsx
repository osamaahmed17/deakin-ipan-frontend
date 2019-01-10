import React, { Component } from 'react'
import Section from 'components/section.jsx'
import ResourcesCard from 'components/cards/resourcesCard.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import Collapsible from 'components/collapsible.jsx'
import { Link } from 'react-router-dom'

class UserModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: null,
      toggleFavourite: '',
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
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

  // Display goal icon
  // If true opacity:1 else opacity: 0.2
  goalIcon = () => {
    if(this.state.module.goalStatus) {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{opacity: '1.0'}} onClick={this.handleGoalClick}> directions_run </i> )
    } else {
      return (<i className="col s1 m1 l1 material-icons btn-flat goal-icon" style={{opacity: '0.2'}} onClick={this.handleGoalClick}> directions_run </i> )
    }
  }
  
  createBackButtonURL = (subStr, str) => {
    // Use document.referrer to get last visited location
    let location = []
    let i = -1
    while((i = str.indexOf(subStr,i+1)) >=0 ) location.push(i);
    // If str last string on right after '/' is Number then slice 2 times else slice one 
    if(isNaN(str.slice(location.slice(-1).pop()+1))) {
      location = location.splice(0,location.length)
      location = location.splice(-1)
      let newLocation = str.substring(0, location)
      return newLocation;
    } else {
      location = location.splice(0,location.length-1)
      location = location.splice(-1)
      if(location.length === 1 && location[0] === 0) {
        let newLocation = ''
        return newLocation
      } else {
        let newLocation = str.substring(0, location)
        return newLocation;
      }
    }
  }

  render () {
    if (!this.state.module) return <LoadingComponent />;
    return(
      <div className="Module container">
        <div className="main-title row">
          <p className="col s10 m10 l10 left-align title">Module {this.props.match.params.m_id}: {this.state.module.title}</p>
          { this.goalIcon() }
          <i className="col s1 m1 l1 material-icons favourite-icon btn-flat" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}>favorite</i>
        </div>
        {
          this.state.module.section.map((items, k) => {
            return (
              <div className="section" key={'section_' + k}>
                <Section data = {items} p_id={this.props.match.params.p_id} m_id = {this.props.match.params.m_id} />
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
              <Collapsible data={this.state.module.activities}  p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="activities" />
            </div>
          </div>
        </div>
        <div className="tasks">
          <div className="row">
            <div className="left-align collaps-title">
              Tasks
            </div>
            <div className="container">
              <Collapsible data={this.state.module.tasks}  p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} contentType="tasks" />
            </div>
          </div>
        </div>
        <div className="resources">
          <ResourcesCard data={this.state.module.resources} p_id={this.props.match.params.p_id} m_id={this.props.match.params.m_id} />
        </div>
        {/* In app back button. Modules page to modules list page */}
        <Link to={this.createBackButtonURL('/', this.props.location.pathname)}> <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back"> <i className="material-icons"> arrow_back </i> </button> </Link>
      </div>
    )
  }
}

export default UserModule;