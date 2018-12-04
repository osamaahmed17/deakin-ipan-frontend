import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null
    } 
  }

  componentDidMount() {
    this.getActivity();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getActivity = () => {
    API.getActivity(this.stateHandler, this.props.match.params.p_id, this.props.match.params.m_id, this.props.match.params.a_id);
  }

  render () {
    let activity = this.state.activity;
    if (!this.state.activity) return <LoadingComponent />;
    return(
      <div className="container">
        {
          activity.data.questionSet.map((items, i) => {
            return (
              <div key={i+1} className="row card">
                <p>{items.question}</p>
                <div id="options" className="col s12 left">
                  {
                    items.options.map((items, i) => {
                      return (
                        <p key={i+1}>
                          <label>
                            <input type="checkbox" className="filled-in"/>
                            <span>{items}</span>
                          </label>
                        </p>
                      )
                    })
                  }
                </div>
                <div id="submit" className="col s12">
                  <button className="btn waves-effect waves-light" type="submit" name="action"> Submit </button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserTask;