import React, { Component } from 'react';

import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'profile'
    };
  }

  render() {
    let view;
    if (this.state.view == 'profile') {
      view = <ViewProfile profile={this.props.profile} />;
    } else if (this.state.view == 'edit') {
      view = <EditProfile />;
    }
    return (
      <div>
        <div className='page-title'>Profile</div>
        <div className='page-body'>
          {view}
        </div>
      </div>
    );
  }
}

export default Profile;
