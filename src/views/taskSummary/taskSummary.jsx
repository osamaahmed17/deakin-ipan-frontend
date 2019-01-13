import React, { Component } from 'react'
import { handleScroll, displayBackButton } from 'helpers/floatingButtonHelper.js'
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
    window.addEventListener("scroll", () => handleScroll(this, this.stateHandler));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => handleScroll(this, this.stateHandler));
  }

  stateHandler = (state) => {
    this.setState(state);
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
        {displayBackButton(this)}
      </div>
    )
  }
}

export default TaskSummary