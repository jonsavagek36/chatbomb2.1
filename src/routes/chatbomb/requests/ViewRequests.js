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
        let acceptRequest = () => {
          this.props.acceptRequest(request);
        }
        return <Requestplate request={request} acceptRequest={acceptRequest} key={idx} />;
      });
    }
    return (
      <div className='view-requests'>
        {requests}
      </div>
    );
  }
}

export default ViewRequests;
