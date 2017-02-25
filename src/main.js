import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Chatbomb from './routes/Chatbomb';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/app" component={App}>
      <IndexRoute path="/app/login" component={Login} />
      <Route path="/app/signup" component={Signup} />
      <Route path="/app/chatbomb" component={Chatbomb} />
    </Route>
  </Router>,
  document.getElementById('app')
);
