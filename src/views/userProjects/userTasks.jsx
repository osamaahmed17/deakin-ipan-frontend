import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      current: 1,
      popUpMessage: null,
      boxTicked: false,
      toggleFavourite: false,
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

  // Each Questions are mapped and unique key is assigned
  questionList(data, key) {
    return (
      <div key={key}>
        <p className="questions"> Question {key+1}: {data.question}</p>
        {this.checkBoxOption(data.options, data.popup)}
        <div className="message">
        {this.displayPopUpMessage()}
        </div>
        <div className="button row">
          {this.previousQuestion()}
          {this.nextQuestionButton()}
        </div>
      </div>
    )
  }

  // The answers for questions are mapped from array
  // Onclick of box popup message is displayed at bottom
  // options = [answers array] and popUpMessage = [popup message array]
  checkBoxOption(options, popUpMessage) {
    return (
      options.map((items, k) => {
        return (
          <p className={"options_" + k + " left-align"}>
            <label>
              <input type="checkbox" key={k} onClick={() => this.answerPopUp(popUpMessage, k)} />
              <span>{items}</span>
            </label>
          </p>
        )
      })
    )
  }

  // Popup message array and option clicked is passed in function to display correct message
  // If box is unticked then popup message is removed
  // Onclick of box pop message is displayed immediately
  // Popup message state is set in this function
  answerPopUp = (popUpMessage, optionNumberCLicked) => {
    this.setState(state => ({
      boxTicked: !state.boxTicked
    }))
    if(this.state.boxTicked === null || this.state.boxTicked === false) {
      return (
        this.setState({
          popUpMessage: popUpMessage[optionNumberCLicked]
        })
      )
    } else {
      this.setState({
        popUpMessage: ''
      })
    }
  }

  // Function will display message if popUpMessage state is not empty
  // Otherwise dont display popup message
  displayPopUpMessage() {
    if(!(this.state.popUpMessage === null || this.state.popUpMessage === '')) {
      return (
        <div className="row">
          <div className="row s12">
            {this.state.popUpMessage}
          </div>
        </div>
      )
    } 
  }

  // Function show Finish if user is at last question
  // Otherwise Next question button is displayed
  nextQuestionButton = () => {
    if(this.state.current === this.state.tasks.data.questionSet.length) {
      return (<a className="waves-effect waves-light btn right" href="/programs"> Finish </a>)
    } else {
      return (<button className="btn right" onClick={() => this.setState({ current: this.state.current+1})}> Next Question </button>)
    }
  }

  // If user is not at first question then Previous button will display
  // Using back button user can check previosu question
  // If user is attmepting 1st question of quiz then previous button wont be displayed
  previousQuestion = () => {
    if(!(this.state.current === 1)) {
      return (<button className="btn left" onClick={() => this.setState({ current: this.state.current - 1})}> Previous Question </button>)
    }
  }

  render () {
    let tasks = this.state.tasks;
    if (!this.state.tasks) return <LoadingComponent />;
    return(
      <div className="container">
        <div className="title row">
          <h2 className="col s11 m11 l11 left-align"> Quiz Title {this.props.title} </h2>
          <i className="col s1 m1 l1 material-icons btn-flat margin-top right-align" style={{opacity: this.state.toggleFavourite ? '1.0' : '0.2'}} onClick={this.handleFavouriteClick}> favorite </i>
          <div className="col s12 m12 l12 left-align sub-heading"> Tasks {this.props.match.params.t_id} : Quiz</div>
        </div>
        <div className="quiz">
          {this.generateQuiz(tasks.data)}
        </div>
      </div>
    )
  }
}

export default UserTask;