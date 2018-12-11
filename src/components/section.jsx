import React, { Component } from 'react'

function displayContent(data) {
  if (data.type === 'image') {
    return (
      <img className="responsive-img" src={data.src} alt={data.altName} />
      )
  } else if (data.type === 'video') {
    return (
      <div className="video-container">
        <iframe src={data.value} frameBorder="0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    )
  } else if (data.type === 'text') {
    return (
      <p>
        {data.value}
      </p>
    )
  }
}

class Section extends Component {
  render () {
    return (
      <div>
        {displayContent(this.props.data)}
      </div>
    )
  }
}

export default Section;