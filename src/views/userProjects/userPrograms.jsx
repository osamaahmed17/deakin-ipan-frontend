import React, { Component } from 'react';
import Card from 'components/card.jsx';

class UserPrograms extends Component {
  render () {
    let data= {
      title: 'Title',
      descriptionShort: 'body'
    }
    
    return (
      <div>
        <Card 
          id='1'
          data= {data}
        />
      </div>
    );
  }
}

export default UserPrograms;
