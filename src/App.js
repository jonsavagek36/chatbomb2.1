import React from 'react';

import Topbar from './layout/Topbar';

const App = () => {
  return (
    <div className='app-body'>
      <Topbar></Topbar>
        {this.props.children}
    </div>
  );
}

export default App;
