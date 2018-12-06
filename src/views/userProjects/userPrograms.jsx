import React, { Component } from 'react'
import Card from 'components/card.jsx'
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

  checkPrograms = (data) => {
    if (data.length > 0) {
      return (
        <div>
          <p>Your Programs</p>
            {
              data.map((items) => {
                return (
                  <div key={items.id}>
                    <Link to={'/programs/' + items.id}>
                      <Card data={items} p_id={items.id}>
                        <div className="row" style={{marginBottom:"0px"}}>
                          <p className="col right">Completed Modules {items.progress === ''? 0 : items.progress}/{items.total}</p>
                        </div>
                        <div className="progress">
                          <div className="determinate" style={{width: (items.progress === ''? 0 : items.progress) +"%"}}></div>
                        </div>
                      </Card>
                    </Link>
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