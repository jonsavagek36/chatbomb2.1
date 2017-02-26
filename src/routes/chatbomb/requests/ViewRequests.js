import React, { Component } from 'react';

import Requestplate from './Requestplate';

class ViewRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let requests = null;
    if (this.props.requests !== undefined) {
      requests = this.props.requests.map((request, idx) => {
        return <Requestplate request={request} key={idx} />;
      });
    }
    return (
      <div>
        <div className='view-requests'>
          {requests}
        </div>
      </div>
    );
  }
}

export default ViewRequests;
