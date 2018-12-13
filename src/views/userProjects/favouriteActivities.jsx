import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import Card from 'components/cards/card.jsx'
import FavouriteActivitiesCard from 'components/cards/favouriteActivitiesCard.jsx'

class FavouriteActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favouriteActivities: null,
    }
  }

  componentDidMount() {
    this.favouriteActivities();
  }

  stateHandler = (state) => {
    this.setState(state);
  }

  favouriteActivities = () => {
  API.getFavouriteActivities(this.stateHandler);
  }

  mapCard = (data) => {
    if(data.favourite === true) {
      return (
        <FavouriteActivitiesCard data={data} />
      )
    }
  }

  render() {
    let favouriteActivities = this.state.favouriteActivities;
    if (!this.state.favouriteActivities) return <LoadingComponent />;
    return (
      <div className="container">
        <h2 className="heading center">My Favourite Activities</h2>
        {
          favouriteActivities.map((data, i) => {
            return <div key={i}> {this.mapCard(data)} </div>
          })
        }
      </div>
    )
  }
}

export default FavouriteActivity;