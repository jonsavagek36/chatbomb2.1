import React, { Component } from 'react';

import Topbar from './layout/Topbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='app-body'>
        <Topbar></Topbar>
          {this.props.children}
      </div>
    );
  }
}

export default App;
 
