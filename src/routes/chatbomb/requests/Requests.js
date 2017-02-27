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
      <div className='main-body'>
        <div className='page-title'>
          <div className='banner'>Friend Requests</div>
        </div>
        <div className='requests-body'>
          <div className='send-requests'>
            <SendInvite sendInvite={this.props.sendInvite} />
            <SendRequests sendRequest={this.props.sendRequest} />
          </div>
          <div className='new-requests'>
            <ViewRequests requests={this.props.requests} acceptRequest={this.props.acceptRequest} />
          </div>
        </div>
      </div>
    );
  }
}

export default Requests;
