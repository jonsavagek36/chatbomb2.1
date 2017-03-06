import React, { Component } from 'react';

import Requestplate from './Requestplate';

export default class ViewRequests extends Component {
  render() {
    let requests = null;
    if (this.props.requests !== undefined) {
      requests = this.props.requests.map((request, idx) => {
        let acceptRequest = () => {
          let new_friends = this.props.acceptRequest(request);
          if (new_friends !== undefined) {
            this.props.updateFriends(new_friends);
          }
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
