import React, { Component } from 'react';

import SendInvite from './SendInvite';
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
          <SendInvite />
          <SendRequests sendRequest={this.props.sendRequest} />
          <ViewRequests />
        </div>
      </div>
    );
  }
}

export default Requests;
