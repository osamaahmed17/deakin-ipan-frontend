import React, { Component } from 'react'
import ModuleCard from 'components/cards/moduleCard.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'

class UserProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: null,
    }
  }

  componentDidMount() {
    this.getProgram();
    // console.log('componentDidMount ' + Date.now())
    // if(!this.state.program) this.getProgram();
    // else console.log('program already exists in state :DDDDDD')
  }

  stateHandler = (state) => {
    // console.log('stateHandler ' + Date.now())
    this.setState(state);
  }

  getProgram = () => {
    // console.log('getProgram ' + Date.now())
    API.getProgram(this.stateHandler, this.props.match.params.p_id);
  }


  render() {
    if (!this.state.program) return <LoadingComponent />;
    console.log(this.state.program)
    return (
      <div className="Program container">
        <p className="left-align main-title">
          Program {this.props.match.params.p_id}
        </p>
        <p className="program-description">
          {this.state.program.description}
        </p>
        {
          this.state.program.modules.map((items) => {
            return (
              <div key={items.id}>
                {/* the status in card is for achivements and favourites */}
                <ModuleCard data={items} p_id={this.props.match.params.p_id} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserProgram;