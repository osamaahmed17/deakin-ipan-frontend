import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class ViewCalender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  render () {
    return (
      <div className="container">
        <p className="left-align">Schedule</p>
        <DayPicker selectedDays = {this.state.selectedDays} onDayClick = {this.handleDayClick} />
        <a className="waves-effect waves-light btn" href={'/programs/' + this.props.match.params.p_id}> Back to programs </a>
      </div>
    )
  }
}

export default ViewCalender;