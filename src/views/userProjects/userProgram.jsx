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
        <h2 className="left-align">Program {this.props.match.params.p_id}</h2>
        {
          program.modules.map((items, id) => {
            return (
              <div key={id}>
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