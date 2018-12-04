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

  render() {
    let programs = this.state.programs;
    if (!this.state.programs) return <LoadingComponent />;
    return (
      <div className="container">
        <p>My Programs</p>
        {
          programs.map((items) => {
            return (
              <div key={items.id}>
                <Link to={'/program/' + items.id}>
                  <Card data={items} p_id={items.id} />
                </Link>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default UserPrograms;