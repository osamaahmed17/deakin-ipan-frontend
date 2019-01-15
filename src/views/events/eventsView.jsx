import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class EventsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [],
      events: [],
    }
  }

  displayEvents = (event) => {
    if (event.length > 0) {
      return (
        <div>
          {event}
          {/* All checkbox are disabled
          If events are finsihed then show checkbox ticked
          Otherwise not ticked */}
          <form action="#!">
            {
              event.map((items) => {
                return (
                  <p>
                    <label>
                      <input type="checkbox" class="filled-in" checked="checked" disabled="disabled" />
                      <span>{items}</span>
                    </label>
                  </p>
                )
              })
            }
          </form>
        </div>
      )
    } else {
      return (
        <div className="no-events">
          No events scheduled.
        </div>
      )
    }
  }

  render () {
    return (
      <div className="events-view container">
        <div className="calendar-view center-align">
          <DayPicker />
          {/* <DayPicker onDayClick={(day) => this.setState({ date: day})}/> */}
        </div>
        <div className="events-list row">
          <div className="title">
            Events:
          </div>
          <div className="events container">
            Display list of events here ...
          {/* { this.displayEvents(this.state.events) } */}
          </div>
        </div>
      </div>
    )
  }
}

export default EventsView

