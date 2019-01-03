import React, { Component } from 'react'

function displayContent(data) {
  if (data.type === 'image') {
    return (
      <img className="responsive-img" src={data.value} alt="section-img"/>
      )
  } else if (data.type === 'video') {
    return (
      <div className="video-container">
        <iframe id="section-video" title="video" src={data.value} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    )
  } else if (data.type === 'text') {
    return (
      <p className="description">
        {data.value}
      </p>
    )
  }
}

class Section extends Component {
  render () {
    return (
      <div className="container">
        {displayContent(this.props.data)}
      </div>
    )
  }
}

export default Section;