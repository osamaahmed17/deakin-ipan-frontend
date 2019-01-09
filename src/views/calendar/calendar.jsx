import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import 'react-day-picker/lib/style.css';
import M from "materialize-css";
import { Link } from 'react-router-dom'

class ViewCalender extends Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
      from: undefined,
      to: undefined,
    }
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleMultiDayClick = this.handleMultiDayClick.bind(this);
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState({
      from: undefined,
      to: undefined,
    });
  }
  
  componentDidMount() {
    const options = {}
    let el = document.querySelector('.tabs');
    M.Tabs.init(el, options)
  }
  
  handleMultiDayClick(day, { selected }) {
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

  btnRedirect = (data) => {
    if(data === null || data === undefined) {
      return (
        <Link to='/programs'>
          <button className="waves-effect waves-light btn"> Programs </button>
        </Link>
      )
    } else {
      return (
        <Link to={'/programs/' + this.props.match.params.p_id}> 
          <button className="waves-effect waves-light btn"> Back To Programs </button>
        </Link>
      )
    }
  }

  render () {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="Calendar container">
        <h2 className="left-align heading col s12">Schedule</h2>
        <div className="row col s12 center-align">
            <div className="">
              <ul className="tabs center-align">
                <li className="tab col s6"><a href="#range-select">Range Select</a></li>
                <li className="tab col s6"><a className="active" href="#multi-select">Multi Select</a></li>
              </ul>
            </div>
            <div id="range-select" className="col s12">
            <div className="RangeExample">
              <p>
                <b>
                  {!from && !to && 'Please select the first day.'}
                  {from && !to && 'Please select the last day.'}
                </b>
                <b>
                  {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                        ${to.toLocaleDateString()}`}{' '}
                </b>
                {from &&
                  to && (
                    <div className="reset-btn col s12">
                      <button className="link btn-small waves-effect waves-light calendar-reset-btn" id="calendar-reset-btn" onClick={this.handleResetClick}>
                      Reset
                    </button>
                    </div>
                  )}
              </p>
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </div>
            <Helmet>
              <style>{`
                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                  background-color: #f0f8ff !important;
                  color: #4a90e2;
                }
                .Selectable .DayPicker-Day {
                  border-radius: 0 !important;
                }
                .Selectable .DayPicker-Day--start {
                  border-top-left-radius: 50% !important;
                  border-bottom-left-radius: 50% !important;
                }
                .Selectable .DayPicker-Day--end {
                  border-top-right-radius: 50% !important;
                  border-bottom-right-radius: 50% !important;
                }
                `}
              </style>
            </Helmet>
        </div>
            <div id="multi-select" className="col s12">
              <DayPicker selectedDays = {this.state.selectedDays} onDayClick = {this.handleMultiDayClick} />
            </div>
          </div>
        <div className="redirect-btn center-align">
          {this.btnRedirect(this.props.match.params.p_id)}  
        </div> 
      </div>
    )
  }
}

export default ViewCalender;