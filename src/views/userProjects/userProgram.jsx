import React, { Component } from 'react'
import Card from 'components/card.jsx'
import { Link } from 'react-router-dom'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null
    } 
  }

  componentDidMount() {
    this.getProgram();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getProgram = () => {
    API.getProgram(this.stateHandler, this.props.match.params.p_id);
  }

  render () {
    let program = this.state.program;
    if (!this.state.program) return <LoadingComponent />;
    return(
      <div className="container">
        <p>Program {this.props.match.params.p_id}</p>
        {
          program.modules.map((items) => {
            return (
              <div key={program.id}>
                <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + program.id}>
                  <Card data={program} p_id={this.props.match.params.id} m_id = {program.id} />
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserProgram;