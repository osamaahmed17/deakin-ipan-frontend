import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import { CONSTANTS } from 'helpers/urlConstants.js'

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
  generateQuiz(quiz) {
    return (
      <div className="quiz">
        {
          quiz.questionSet.map((question, i) => {
            if(question.id === this.state.current) {
              return this.questionList(question, i)
            }
          })
        }
      </div>
    )
  }

  // Each Questions are mapped and unique key is assigned
  questionList(data) {
    return (
      <div key={data.id}>
        <p className="question"> Question {data.id}: {data.question}</p>
        {this.checkBoxOption(data.options, data.popup)}
        <div className="popup-message">
          {this.state.popUpMessage}
        </div>
      </div>
    )
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
  // Onclick of box popup message is displayed at bottom
  // options = [answers array] and popUpMessage = [popup message array]
  checkBoxOption(options, popUpMessage) {
    return (
      options.map((items, k) => {
        return (
          <div className={"checkbox_" + k + " left-align"} key={k}>
            <label>
              <input type="checkbox" defaultChecked={this.isDefaultChecked(k)}  id={"checkbox_" + k} key={k} onClick={() => this.handleQuestionOptionClick(popUpMessage[k], k)}/>
              <span>{items}</span>
            </label>
          </div>
        )
      })
    )
  }

  // Function will display message if popUpMessage state is not empty
  // Otherwise dont display popup message
  handleQuestionOptionClick = (message, k) => {
    this.setState({ popUpMessage: message })
    let quizRecord = this.state.quizRecord;
    if (quizRecord.length === 0) {
      quizRecord.push({questionId: this.state.current, selectedOptions: k})
      return;
    }
    let currentQuestion = quizRecord.find(question => question.questionId === this.state.current)
    if (currentQuestion === undefined) {
      quizRecord.push({questionId: this.state.current, selectedOptions: k})
      return;
    }
    let currentQuestionIndex = quizRecord.indexOf(currentQuestion)
    const previouslySelectedOptions = currentQuestion.selectedOptions
    const item = document.getElementById("checkbox_" + previouslySelectedOptions)
    item.checked = false
    currentQuestion.selectedOptions = k
    quizRecord[currentQuestionIndex] = currentQuestion;
    this.setState({quizRecord: quizRecord})
    
  }

  // Function show Finish if user is at last question
  // Otherwise Next question button is displayed
  nextQuestionButton = () => {
    if(this.state.current === this.state.tasks.data.questionSet.length) {
      return (<a className="waves-effect waves-light btn right finish-btn" id="finish-btn" href={CONSTANTS.PROGRAMS}> Finish </a>)
    } else {
      return (<button className="btn next-btn right" id="next-btn" onClick={() => this.setState({ current: this.state.current+1, popUpMessage: '' })}> Next </button>)
    }
  }

  // If user is not at first question then Previous button will display
  // Using back button user can check previosu question
  // If user is attmepting 1st question of quiz then previous button wont be displayed
  previousQuestion = () => {
    if(!(this.state.current === 1)) {
      return (<button className="btn previous-btn left" id="previous-btn" onClick={() => this.setState({ current: this.state.current - 1, popUpMessage: '' })}> Previous </button>)
    }
  }

  render () {
    if (!this.state.tasks) return <LoadingComponent />;
    return(
      <div className="Tasks container">
        <div className="tasks-quiz-main">
          <div className="main-title row">
            <p className="col s11 m11 l11 left-align title"> Quiz </p>
            <i className="col s1 m1 l1 material-icons btn-flat right-align favourite-icon" id={"tasks_" + this.state.tasks.id + "-favourite-icon"} style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            <p className="col s12 m12 l12 left-align sub-title"> Tasks {this.props.match.params.t_id}</p>
          </div>
          {this.generateQuiz(this.state.tasks.data)}
        </div>
        <div className="tasks-quiz-footer">
          <div className="buttons row">
            {this.previousQuestion()}
            {this.nextQuestionButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default UserTask;