import React, { Component } from 'react';

import Topbar from './layout/Topbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Topbar></Topbar>
        <div className='app-body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
