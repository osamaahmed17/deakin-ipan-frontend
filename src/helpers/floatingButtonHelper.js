import React from 'react'
import { Link } from 'react-router-dom'
var _ = require('underscore')

var isMainFloatingButtonVisible = true

export const handleScroll = (obj, stateHandler) => {
  const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const windowBottom = Math.round(windowHeight + window.pageYOffset);
  if (windowBottom >= docHeight) {
    isMainFloatingButtonVisible = false
    stateHandler({
      scrollBottomStatus: true
    });

  } else {
    isMainFloatingButtonVisible = true
    stateHandler({
      scrollBottomStatus: false
    });
  }
}

// The button will hide when user is at the bottom of the page and footer will have back button
export const displayBackButton = (scrollBottomStatus, pathname) => {
  if (_.isEqual(scrollBottomStatus, false) &&
    (pathname.includes('/modules/') ||
      pathname.includes('/tasks/') ||
      pathname.includes('/summary') ||
      pathname.includes('/activities/') ||
      pathname.includes('calendar'))) {
    return (
      <Link to={createBackButtonURL('/', pathname)}>
        <button className="back-btn btn-large btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
          <i className="material-icons"> arrow_back </i>
        </button>
      </Link>
    )
  }
}

export const footerBackButton = (pathname) => {
  if (!isMainFloatingButtonVisible &&
    (pathname.includes('/modules/') ||
      pathname.includes('/tasks/') ||
      pathname.includes('/summary') ||
      pathname.includes('/activities/') ||
      pathname.includes('calendar'))) {
    return (
      <span>
        <Link to={createBackButtonURL('/', pathname)}>
          <button className="back-btn btn-floating waves-effect waves-light" id="back-btn" title="Go Back">
            <i className="material-icons"> arrow_back </i>
          </button>
        </Link>
      </span>
    )
  }
}

export const createBackButtonURL = (subStr, str) => {
  let location = []
  let i = -1
  while ((i = str.indexOf(subStr, i + 1)) >= 0) location.push(i);
  // If str last string on right after '/' is Number then slice 2 times else slice one 
  if (isNaN(str.slice(location.slice(-1).pop() + 1))) {
    location = location.splice(0, location.length)
    location = location.splice(-1)
    let newLocation = str.substring(0, location)
    return newLocation;
  } else {
    location = location.splice(0, location.length - 1)
    location = location.splice(-1)
    if (location.length === 1 && location[0] === 0) {
      let newLocation = ''
      return newLocation
    } else {
      let newLocation = str.substring(0, location)
      return newLocation;
    }
  }
}