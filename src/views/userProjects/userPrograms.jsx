import React, { Component } from 'react';
import Card from 'components/card.jsx';

class UserPrograms extends Component {
  render () {
    let data= {
      title: 'Title',
      shortDesc: 'Body',
      progress: '',
      link: ''
    }
    
    return (
      <div>
        <div className="row">
          <Card 
            id='1'
            data= {data}
          />
        </div>
      </div>
    );
  }
}

export default UserPrograms;
