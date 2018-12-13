import React, { Component } from 'react'
import API from 'helpers/api.js'
import ModuleCard from 'components/cards/moduleCard.jsx'
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
    if(data.favourite.status === "true") {
      return (
        <ModuleCard data={data}>
          <p className="justify-content text-color-white description">{data.shortDescription}</p>
          <div className="row margin-bot-rm">
            <p className="col right" style={{marginBottom:"0px"}}> {data.status} </p>
          </div>
        </ModuleCard>
      )
    }
  }

  render() {
    let favouriteModules = this.state.favouriteModules;
    if (!this.state.favouriteModules) return <LoadingComponent />;
    return (
      <div className="container">
        <h2 className="heading center">My Favourite Modules</h2>
        {
          favouriteModules.map((array, i) => {
            return (
              <div key={i}>
                {
                  array.modules.map((item, j) => {
                    return (
                      <div key={j}> {this.mapCard(item)} </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default FavouriteModule;