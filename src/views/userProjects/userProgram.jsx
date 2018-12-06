import React, { Component } from 'react'
import Card from 'components/card.jsx'
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
    // this.countOccurence("/","/programs/1/modules/1/activities/1")
    return(
      <div className="container">
        <p>Program {this.props.match.params.p_id}</p>
        {
          program.modules.map((items, id) => {
            return (
              <div key={id}>
                {/* the status in card is for achivements and favourites */}
                  <Card data={items} p_id={this.props.match.params.id} m_id = {program.id} status={true}>
                    <Link to={'/programs/' + this.props.match.params.p_id + '/modules/' + program.id}>
                      <p className="justify-content text-color">{items.shortDescription}</p>
                    </Link>
                    <div className="row margin-bot-rm">
                      <p className="col right" style={{marginBottom:"0px"}}>Status: {program.status}</p>
                      </div>
                  </Card>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserProgram;