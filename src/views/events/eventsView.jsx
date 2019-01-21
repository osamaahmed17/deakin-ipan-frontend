import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class EventsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.generateEventDate(new Date()),
      events: [],
    }
  }

  generateEventDate = (date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    return (
      date.getDate() + ' ' + monthNames[date.getMonth()]
    )
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
          <p>
            No events scheduled on this day yet
          </p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="events-view container">
        {/* Calendar & events for mobile and tablet view */}
        <div className="calendar-view center-align hide-on-large-only">
          <DayPicker onDayClick={(day) => this.setState({ day: this.generateEventDate(day) })} />
          {/* <DayPicker onDayClick={(day) => this.setState({ day: day})}/> */}
        </div>
        <div className="events-list row hide-on-large-only center-align">
          <div className="title">
            SCHEDULED EVENTS
          </div>
          
          <div className="events container hide-on-large-only">
            {this.displayEvents(this.state.events)}
          </div>
        </div>

        {/* Calendar & events for desktop view */}
        <div className="calendar-view-l row hide-on-med-and-down">
          <div className="col s6 m6 l6">
            <DayPicker onDayClick={(day) => this.setState({ day: day })} />
          </div>
          <div className="col s6 m6 l6">
            <div className="events-list row">
              <div className="title">
                SCHEDULED EVENTS
              </div>
              <div className="events">
                {this.displayEvents(this.state.events)}
              </div>
            </div>
          </div>
          {/* <DayPicker onDayClick={(day) => this.setState({ day: day})}/> */}
        </div>

      </div>
    )
  }
}

export default EventsView

