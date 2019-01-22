import React, { Component } from 'react'
import API from 'helpers/api.js'
import FavouriteModulesCard from 'components/cards/favouriteModulesCard.jsx'
import LoadingComponent from 'components/loading/loading'

class FavouriteModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteModules: null,
    }
  }

  componentDidMount() {
    this.getFavouriteModules();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  getFavouriteModules = () => {
    API.getFavouriteModules(this.stateHandler);
  }

  render() {
    if (!this.state.favouriteModules) return (
      <div className="FavouriteModule container">
        <p className="main-title left-align"> My Favourite Modules </p>
        <p>No favourite Modules.</p>
      </div>
    );
    return (
      <div className="FavouriteModule container">
        <p className="main-title left-align"> My Favourite Modules </p>
        {
          this.state.favouriteModules.map((data, i) => {
            return <FavouriteModulesCard key={i} data={data} />
          })
        }
      </div>
    )
  }
}

export default FavouriteModule;