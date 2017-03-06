import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { loginUser } from './fetchCalls';

export default class Login extends Component {
  goSignup() {
    browserHistory.push('/app/signup');
  }
  render() {
    return (
      <div className='login-page'>
        <div className='form-title'>Login</div>
        <div className='form-box'>
          <div className='form-row'>
            <div className='form-label'>E-Mail: </div>
            <div className='form-input'><input type='text' id='login-email' /></div>
          </div>
          <div className='form-row'>
            <div className='form-label'>Password: </div>
            <div className='form-input'><input type='password' id='login-password' /></div>
          </div>
          <div className='form-buttons'>
            <div className='login-btn'><button onClick={loginUser}>login</button></div>
            <div className='signup-btn'><button onClick={this.goSignup}>sign up</button></div>
          </div>
          <div className='form-message' id='login-message'>
          </div>
        </div>
      </div>
    );
  }
}
