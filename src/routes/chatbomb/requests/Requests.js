import React, { Component } from 'react';

import SendRequests from './SendRequests';
import ViewRequests from './ViewRequests';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='page-title'>Friend Requests</div>
        <div className='page-body'>
          <SendRequests sendRequest={this.props.sendRequest} />
          <ViewRequests />
        </div>
      </div>
    );
  }
}

export default Requests;
