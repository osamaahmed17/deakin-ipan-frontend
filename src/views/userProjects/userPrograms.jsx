import React, { Component } from 'react'
import Card from 'components/cards/card.jsx'
import { Link } from 'react-router-dom'
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
          <p className="heading">Your Programs</p>
            {
              data.map((items) => {
                return (
                  <div key={items.id}>
                      <Card data={items} p_id={items.id}>
                        <Link to={'/programs/' + items.id}>
                          <p className="justify-content text-color-white description">{items.shortDescription}</p>
                        </Link>
                        <div className="row" style={{marginBottom:"0px"}}>
                          <p className="col right">Completed Modules {items.progress === '' ? 0 : items.progress}/{items.total}</p>
                        </div>
                        <div className="progress">
                          <div className="determinate white" style={{width: (items.progress === '' ? 0 : ((items.progress*100)/items.total)) +"%"}}></div>
                        </div>
                      </Card>
                  </div>
                )
              })
            } 
        </div>
      )
    } else {
      return (
        <div className="row padding-top">
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