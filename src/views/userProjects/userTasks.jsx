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
      <form onSubmit={this.validationCheck} noValidate>
          {
            tasks.data.questionSet.map((items, i) => {
              return (
                <div key={i+1} className="row card">
                  <p>{items.question}</p>
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
          <button className="btn waves-effect waves-light" onClick= {this.validationCheck} > Submit </button>
        </form>
      </div>
    )
  }
}

export default UserTask;