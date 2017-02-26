import React, { Component } from 'react';

class Requestplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='request-plate'>
        <div className='request-avatar'></div>
        <div className='request-info'>
          <div className='request-name'>{this.props.request.request_name}</div>
          <div className='request-email'>{this.props.request.request_email}</div>
        </div>
        <div className='accept-request'>
          <div className='accept-button'><button>Accept Request</button></div>
        </div>
      </div>
    );
  }
}

export default Requestplate;
