import React, { Component } from 'react'
import ModuleCard from 'components/cards/moduleCard.jsx'
import { Link } from 'react-router-dom'
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
        <p className="left-align"><h2>Program {this.props.match.params.p_id}</h2></p>
        {
          program.modules.map((items, id) => {
            return (
              <div key={id}>
                {/* the status in card is for achivements and favourites */}
                  <ModuleCard data={items} p_id={this.props.match.params.id} m_id = {id} status={true} goal={items.goal} favourite={items.favourite}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + id}>
                      <p className="justify-content text-color-white description">{items.shortDescription}</p>
                    </Link>
                    <div className="row margin-bot-rm">
                      <p className="col right" style={{marginBottom:"0px"}}> {items.status} </p>
                    </div>
                  </ModuleCard>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserProgram;