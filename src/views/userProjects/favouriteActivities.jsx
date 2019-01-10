import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
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

  render() {
    if (!this.state.favouriteActivities) return <LoadingComponent />;
    return (
      <div className="FavouriteActivities container">
        <p className="main-title left-align">My Favourite Activities</p>
        {
          this.state.favouriteActivities.map((data, i) => {
            return <FavouriteActivitiesCard key={i} data={data} />
          })
        }
      </div>
    )
  }
}

export default FavouriteActivity;