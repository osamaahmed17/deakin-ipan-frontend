import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from 'helpers/urlConstants.js'
var _ = require('underscore');

class TaskSummary extends Component{
  displayResult = (data,  key) => {
    if(data.selectedOptions === Number(data.correctAnswer.optionId)){
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
    // http://localhost:3000/programs/1/modules/1/tasks/1/summary
    if(!_.isEqual(this.props.location, undefined)) return (
      <div className="TaskSummary container">
        <div className="main-title left-align">
          Task Summary
        </div>
        <div className="summary container left-align">
          <p> Please finish the task {this.props.match.params.t_id} first.</p>
        </div>
        <div className="container">
          <Link to={{ pathname: CONSTANTS.PROGRAMS}}>
            <button className="waves-effect waves-light btn back-to-module-btn" id="back-to-program-btn"> Back to Programs</button>
          </Link>
        </div>
      </div>
    )
    return (
      <div className="TaskSummary container">
        <div className="main-title left-align">
          Task Summary
        </div>
        <div className="summary container left-align">
        <p className="task-attempt-status">Total Questions attempted {this.props.location.state.quizRecord.length} out of {this.props.location.state.totalNumberOfQuestions}.</p>
          {
            this.props.location.state.quizRecord.map((data, i) => {
              return this.displayResult(data, i)
            })
          }
        </div>
        <div className="container">
          <Link to={{ pathname: CONSTANTS.PROGRAMS}}>
            <button className="waves-effect waves-light btn back-to-program-btn" id="back-to-module-btn"> Back to Programs</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default TaskSummary