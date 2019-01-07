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

  mapCard = (data) => {
    if(data.favouriteStatus === true) {
      return (
        <FavouriteModulesCard Card data={data} />
      )
    }
  }

  render() {
    if (!this.state.favouriteModules) return <LoadingComponent />;
    return (
      <div className="FavouriteModule container">
        <p className="main-title left-align"> My Favourite Modules </p>
        {
          this.state.favouriteModules.map((array, i) => {
            return <div className="favourites-card" key={i}> {this.mapCard(array)} </div>
          })
        }
      </div>
    )
  }
}

export default FavouriteModule;