import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import { CONSTANTS } from 'helpers/urlConstants.js'
import { Link } from 'react-router-dom'
import { replacePlaceHolder } from 'helpers/urlHelper.js'
var _ = require('underscore');

class UserTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      current: 1,
      popUpMessage: '',
      toggleFavourite: false,
      quizRecord: []
    }
  }

  componentDidMount() {
    this.getTasks();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getTasks = () => {
    API.getTasks(this.stateHandler, this.props.match.params.p_id, this.props.match.params.m_id, this.props.match.params.t_id);
  }

  // Onclick favourite icon toggle true and false state
  handleFavouriteClick = () => {
    this.setState({
      toggleFavourite: !this.state.toggleFavourite
    })
  }

  // GenerateQuiz Function will take array as data and map them
  generateQuiz = (quiz) => {
    return (
      <div className="quiz">
        {
          quiz.questionSet.map((question, i) => {
            if (question.id === this.state.current) {
              return this.questionList(question, quiz.answerType)
            }
            return ''
          })
        }
      </div>
    )
  }

  // Each Questions are mapped and unique key is assigned
  questionList = (data, answerType) => {
    return (
      <div key={data.id}>
        <p className="question"> Question {data.id}: {data.question}</p>
        {this.checkBoxOption(data.options, data.popup, data.correct, data.question)}
        <div className="popup-message">
          {this.checkAnswerFlag(answerType)}
        </div>
      </div>
    )
  }

  // Check the answer flag for pop-up messages
  // Popup, summary or both
  checkAnswerFlag = (data) => {
    switch (data) {
      case CONSTANTS.ANSWERS.ANSWER_POPUP:
        return this.state.popUpMessage
      case CONSTANTS.ANSWERS.ANSWER_BOTH:
        return this.state.popUpMessage
      case CONSTANTS.ANSWERS.ANSWER_SUMMARY:
        break
      default:
        break
    }
  }

  isDefaultChecked = (k) => {
    let quizRecord = this.state.quizRecord;
    if (quizRecord.length === 0) {
      return false;
    }
    let currentQuestion = quizRecord.find(question => question.questionId === this.state.current)
    if (currentQuestion === undefined) {
      return false;
    }
    let val = currentQuestion.selectedOptions === k
    return val
  }

  // The answers for questions are mapped from array
  checkBoxOption = (options, popUpMessage, correctAnswer, question) => {
    return (
      options.map((items, k) => {
        return (
          <div className={"checkbox_" + k + " left-align"} key={k}>
            <label>
              <input type="checkbox" defaultChecked={this.isDefaultChecked(k)} id={"checkbox_" + k} key={k} onClick={() => this.handleQuestionOptionClick(popUpMessage[k], k, correctAnswer, question, options[k])} />
              <span>{items}</span>
            </label>
          </div>
        )
      })
    )
  }

  // Function will display message if popUpMessage state is not empty
  // Otherwise dont display popup message
  handleQuestionOptionClick = (message, k, correctAnswer, question, options) => {
    this.setState({ popUpMessage: message })
    let quizRecord = this.state.quizRecord;
    if (quizRecord.length === 0) {
      quizRecord.push({ questionId: this.state.current, selectedOptions: k, selectedOptionsData: options, correctAnswer: correctAnswer, question: question })
      return;
    }
    let currentQuestion = quizRecord.find(question => question.questionId === this.state.current)
    if (currentQuestion === undefined) {
      quizRecord.push({ questionId: this.state.current, selectedOptions: k, selectedOptionsData: options, correctAnswer: correctAnswer, question: question })
      return;
    }
    let currentQuestionIndex = quizRecord.indexOf(currentQuestion)
    const previouslySelectedOptions = currentQuestion.selectedOptions
    const item = document.getElementById("checkbox_" + previouslySelectedOptions)
    item.checked = false
    currentQuestion.selectedOptions = k
    quizRecord[currentQuestionIndex] = currentQuestion;
    this.setState({ quizRecord: quizRecord })
  }

  // Function show Finish if user is at last question
  // Otherwise Next question button is displayed
  nextQuestionButton = () => {
    if (this.state.current === this.state.tasks.data.questionSet.length && (_.isEqual(this.state.quizRecord.length, this.state.tasks.data.questionSet.length))) {
      return (
        <Link to={{ pathname: replacePlaceHolder(CONSTANTS.TASK_SUMMARY, [this.props.match.params.p_id, this.props.match.params.m_id, this.props.match.params.t_id]), state: { quizRecord: this.state.quizRecord, totalNumberOfQuestions: this.state.tasks.data.questionSet.length } }}>
          <button className="waves-effect waves-light btn right finish-btn" id="finish-btn" > Finish </button>
        </Link>
      )
    } else if (this.state.current !== this.state.tasks.data.questionSet.length) {
      return (
        <button className="btn next-btn right" id="next-btn" onClick={() => this.setState({ current: this.state.current + 1, popUpMessage: '' })}> Next </button>
      )
    }
  }

  // If user is not at first question then Previous button will display
  // Using back button user can check previosu question
  // If user is attmepting 1st question of quiz then previous button wont be displayed
  previousQuestion = () => {
    if (!(this.state.current === 1)) {
      return (
        <button className="btn previous-btn left" id="previous-btn" onClick={() => this.setState({ current: this.state.current - 1, popUpMessage: '' })}> Previous </button>
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

  render() {
    if (!this.state.tasks) return <LoadingComponent />;
    return (
      <div className="Tasks container">
        <div className="tasks-quiz-main">
          <div className="main-title row">
            <p className="col s11 m11 l11 left-align title">
              Quiz
            </p>
            <i className="col s1 m1 l1 material-icons btn-flat right-align favourite-icon" id={"tasks_" + this.state.tasks.id + "-favourite-icon"} style={{ opacity: this.state.toggleFavourite ? '1.0' : '0.2' }} onClick={this.handleFavouriteClick}> favorite </i>
            <p className="col s6 m6 l6 left-align sub-title left-align">
              Tasks {this.props.match.params.t_id}
            </p>
            <p className="col s6 m6 l6 left-align sub-title right-align">
              Progress {this.state.quizRecord.length}/{this.state.tasks.data.questionSet.length}   
            </p>
            <div className="progress">
              <div className="determinate" style={{ width: ((this.state.quizRecord.length / this.state.tasks.data.questionSet.length)*100) + "%"}}></div>
            </div>
          </div>
          {this.generateQuiz(this.state.tasks.data)}
        </div>
        <div className="tasks-quiz-footer">
          <div className="buttons row">
            {this.previousQuestion()}
            {this.nextQuestionButton()}
          </div>

          {/* Floating back button code */}
          <Link to={this.createBackButtonURL('/', this.props.location.pathname)}>
            <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
              <i className="material-icons"> arrow_back </i>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default UserTask;