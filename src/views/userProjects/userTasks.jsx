import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

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
      <div>
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

  displayPopUpMessage = () => {
    return this.state.popUpMessage ? this.state.popUpMessage : "makichoo"
  }

  // Each Questions are mapped and unique key is assigned
  questionList(data, key) {
    return (
      <div key={key}>
        <p className="questions"> Question {key+1}: {data.question}</p>
        {this.checkBoxOption(data.options, data.popup)}
        <div className="message">
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
              <input type="checkbox" defaultChecked={this.isDefaultChecked(k)}  id={"checkbox" + k} key={k} onClick={() => this.handleQuestionOptionClick(popUpMessage[k], k)}/>
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
    const item = document.getElementById("checkbox" + previouslySelectedOptions)
    item.checked = false
    currentQuestion.selectedOptions = k
    quizRecord[currentQuestionIndex] = currentQuestion;
    this.setState({quizRecord: quizRecord})
    
  }

  // Function show Finish if user is at last question
  // Otherwise Next question button is displayed
  nextQuestionButton = () => {
    if(this.state.current === this.state.tasks.data.questionSet.length) {
      return (<a className="waves-effect waves-light btn right" href="/programs"> Finish </a>)
    } else {
      return (<button className="btn right" onClick={() => this.setState({ current: this.state.current+1, popUpMessage: '' })}> Next </button>)
    }
  }

  // If user is not at first question then Previous button will display
  // Using back button user can check previosu question
  // If user is attmepting 1st question of quiz then previous button wont be displayed
  previousQuestion = () => {
    if(!(this.state.current === 1)) {
      return (<button className="btn left" onClick={() => this.setState({ current: this.state.current - 1, popUpMessage: '' })}> Previous </button>)
    }
  }

  render () {
    let tasks = this.state.tasks;
    if (!this.state.tasks) return <LoadingComponent />;
    return(
      <div className="tasks-quiz container">
        <div className="tasks-quiz-main">
          <div className="title row">
            <h2 className="col s11 m11 l11 left-align"> Quiz Title {this.props.title} </h2>
            <i className="col s1 m1 l1 material-icons btn-flat margin-top right-align" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
            <div className="col s12 m12 l12 left-align sub-heading"> Tasks {this.props.match.params.t_id} : Quiz</div>
          </div>
          <div className="quiz">
            {this.generateQuiz(tasks.data)}
          </div>
        </div>
        <div className="tasks-quiz-footer">
          <div className="row">
            {this.previousQuestion()}
            {this.nextQuestionButton()}
          </div>
        </div>
      </div>
    )
  }
}

export default UserTask;