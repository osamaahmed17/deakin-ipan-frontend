import React, { Component } from 'react'

function content(data) {
  if (data.type === 'image') {
    return (
      <img className="responsive-img" src={data.src} alt={data.altName} />
      )
  } else if (data.type === 'video') {
    return (
      <video className="reponsive-video" controls>
        <source src={data.src} type="video/mp4" />
      </video>
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
        {content(this.props.data)}
      </div>
    )
  }
}

export default Section;