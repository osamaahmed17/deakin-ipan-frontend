import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null
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

  render () {
    let tasks = this.state.tasks;
    if (!this.state.tasks) return <LoadingComponent />;
    return(
      <div className="container">
        <div className="title row padding-top">
          <div className="col s10 m10 l10 left-align heading"> Quiz Title {this.props.title} </div>
          <div className="col s2 m2 l2 right-align"> <i className="material-icons"> favorite_border </i> </div>
          <div className="col s12 m12 l12 left-align"> Tasks {this.props.match.params.t_id} : Quiz</div>
        </div>
      <form onSubmit={this.validationCheck} noValidate>
          {
            tasks.data.questionSet.map((items, i) => {
              return (
                <div key={i+1} className="row card">
                  <p className="description">{items.question}</p>
                  <div className="col s12 options" id={i}>
                    {
                      items.options.map((items, i) => {
                        return (
                          <p key={i+1} className="left-align">
                            <label>
                              <input type="checkbox" className="filled-in" />
                              <span>{items}</span>
                            </label>
                          </p>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          <a className = "waves-effect waves-light btn" href = {'/programs/' + this.props.match.params.p_id + '/modules/' + this.props.match.params.m_id}> Submit </a>
        </form>
      </div>
    )
  }
}

export default UserTask;