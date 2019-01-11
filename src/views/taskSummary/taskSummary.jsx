import React, { Component } from 'react'
import { Link } from 'react-router-dom'
var _ = require('underscore');

class TaskSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      scrollBottomStatus: '',
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  displayResult = (data, key) => {
    if (data.selectedOptions === Number(data.correctAnswer.optionId)) {
      return (
        <div key={key}>
          <p className="question"> Question {data.questionId}: {data.question}</p>
          <p className="text">Your selection is correct:</p>
          <p className="correct-answer"> {data.correctAnswer.optionValue} </p>
        </div>
      )
    } else {
      return (
        <div key={key}>
          <p className="question"> Question {data.questionId}: {data.question}</p>
          <p className="text">Your selection:</p>
          <p className="wrong-selection"> {data.selectedOptionsData} </p>
          <p className="text">Correct Answer:</p>
          <p className="correct-answer"> {data.correctAnswer.optionValue} </p>
        </div>
      )
    }
  }

  createBackButtonURL = (subStr, str) => {
    // Use document.referrer to get last visited location
    let location = []
    let i = -1
    while ((i = str.indexOf(subStr, i + 1)) >= 0) location.push(i);
    // If str last string on right after '/' is Number then slice 2 times else slice one 
    if (isNaN(str.slice(location.slice(-1).pop() + 1))) {
      location = location.splice(0, location.length)
      location = location.splice(-1)
      let newLocation = str.substring(0, location)
      return newLocation;
    } else {
      location = location.splice(0, location.length - 1)
      location = location.splice(-1)
      if (location.length === 1 && location[0] === 0) {
        let newLocation = ''
        return newLocation
      } else {
        let newLocation = str.substring(0, location)
        return newLocation;
      }
    }
  }

  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = Math.round(windowHeight + window.pageYOffset);
    if (windowBottom >= docHeight) {
      this.setState({
        scrollBottomStatus: true
      })
    } else {
      this.setState({
        scrollBottomStatus: false
      });
    }
  }

  // The button will hide when user is at the bottom of the page and footer will have back button
  displayBackButton = () => {
    if (_.isEqual(this.state.scrollBottomStatus, false)) {
      return (
        <Link to={this.createBackButtonURL('/', this.props.location.pathname)}>
          <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
            <i className="material-icons"> arrow_back </i>
          </button>
        </Link>
      )
    }
  }

  render() {
    if (_.isEqual(this.props.location.state, undefined)) return (
      <div className="TaskSummary container">
        <div className="main-title left-align">
          Task Summary
        </div>
        <div className="summary container left-align">
          <p> Please finish the task {this.props.match.params.t_id}.</p>
        </div>
      </div>
    )
    return (
      <div className="TaskSummary container">
        <div className="main-title left-align">
          Task Summary
        </div>
        <div className="summary container left-align">
          {
            this.props.location.state.quizRecord.map((data, i) => {
              return this.displayResult(data, i)
            })
          }
        </div>
        <div className="container task-summary">
          Summary
          <br />
          {this.props.location.state.taskSummary}
        </div>
        {this.displayBackButton()}
      </div>
    )
  }
}

export default TaskSummary