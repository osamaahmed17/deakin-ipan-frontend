import React, { Component } from 'react'

function displayContent(data) {
  if (data.type === 'IMAGE') {
    return (
      <img className="responsive-img" src={data.data.value} alt="section-img"/>
      )
  } else if (data.type === 'VIDEO') {
    return (
      <div className="video-container">
        <iframe id="section-video" title="video" src={data.data.value} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    )
  } else if (data.type === 'TEXT') {
    return (
      <p className="description">
        {data.data.value}
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
