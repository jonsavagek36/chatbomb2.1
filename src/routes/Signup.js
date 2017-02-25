import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { signUp } from './fetchCalls';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack() {
    browserHistory.push('/app');
  }

  render() {
    return (
      <div className='signup-page'>
        <div className='form-title'>Sign Up</div>
        <div className='form-box'>
          <div className='form-row'>
            <div className='form-label'>E-Mail: </div>
            <div className='form-input'><input type='text' id='signup-email' /></div>
          </div>
          <div className='form-message' id='email-message'></div>
          <div className='form-row'>
            <div className='form-label'>Screen Name: </div>
            <div className='form-input'><input type='text' id='signup-screenname' /></div>
          </div>
          <div className='form-message' id='screenname-message'></div>
          <div className='form-row'>
            <div className='form-label'>Password: </div>
            <div className='form-input'><input type='password' id='signup-password' /></div>
          </div>
          <div className='form-row'>
            <div className='form-label'>Confirm Password: </div>
            <div className='form-input'><input type='password' id='confirm-password' /></div>
          </div>
          <div className='form-message' id='password-message'></div>
          <div className='form-buttons'>
            <div className='signup-btn' onClick={signUp}><button>Sign Up</button></div>
            <div className='login-btn'><button onClick={this.goBack}>Back</button></div>
          </div>
          <div className='form-message' id='signup-message'></div>
        </div>
      </div>
    );
  }
}

export default Signup;
