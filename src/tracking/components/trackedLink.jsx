import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import track from 'react-tracking'
import { E } from 'tracking/tracking.js'

class TrackedLink extends Component {
  trackClick = () => {
    this.props.tracking.trackEvent({ event: E.T_UI_CLICK })
    if (this.props.onClick) {
      this.props.onClick(); // Call the function passed from parent
    }
  }

  render() {
    return (
      <Link {...this.props} onClick={this.trackClick} >
        {this.props.children}
      </Link>
    );
  }
}

export default track()(TrackedLink)
