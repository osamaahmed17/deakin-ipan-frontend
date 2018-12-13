import React, { Component } from 'react'
import API from 'helpers/api.js'
import LoadingComponent from 'components/loading/loading'
import Card from 'components/cards/card.jsx'

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
    let favouriteActivities = this.state.favouriteActivities;
    if (!this.state.favouriteActivities) return <LoadingComponent />;
    return (
      <div className="container">
        <h2 className="heading center">My Favourite Activities</h2>
        {
          favouriteActivities.map((data, i) => {
            return (
              <Card data={data}>
                <div className="row">
                  <div className="col s9 left-align"> {data.shortDescription} </div>
                  <div className="col s3"> {data.status} </div>
                </div>
              </Card>
            )
          })
        }
      </div>
    )
  }
}

export default FavouriteActivity;