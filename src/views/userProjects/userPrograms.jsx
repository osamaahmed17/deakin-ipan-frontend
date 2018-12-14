import React, { Component } from 'react'
import Card from 'components/cards/card.jsx'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading';

class UserPrograms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: null
    } 
  }

  componentDidMount() {
    this.getPrograms();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getPrograms = () => {
    API.getPrograms(this.stateHandler);
  }

  // CheckProgram function will check the programs length. If data.length = 0 then show + sign to add new programs
  // Otherwise Programs will be displayed
  checkPrograms = (data) => {
    if (data.length > 0) {
      return (
        <div>
          <h2 className="left-align">Your Programs</h2>
            {
              data.map((items) => {
                return (
                  <div key={items.id}>
                      <Card data={items} p_id={items.id} />
                  </div>
                )
              })
            } 
        </div>
      )
    } else {
      return (
        <div className="container row">
          <i className="material-icons md-light large">add_circle_outline</i>
          <p>Add New Program</p>
        </div>
      )
    }
  }

  render() {
    let programs = this.state.programs;
    if (!this.state.programs) return <LoadingComponent />;
    return (
      <div className="container">
        {this.checkPrograms(programs)}
      </div>
    )
  }
}

export default UserPrograms;