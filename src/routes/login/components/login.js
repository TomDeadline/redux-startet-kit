import React, { Component } from 'react';
import axios from 'axios';
import './login.scss'

export default class login extends Component {
  constructor (props) {
    super (props);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleRegClick = this.handleRegClick.bind(this);
    console.log(props);
  }

  handleSignInClick () {
    axios.post('/login', {
      password: document.getElementById('password-field').value,
      username: document.getElementById('login-field').value
    })
      .then((response) => {
        console.log(response);
        this.props.router.push('/ToDo');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRegClick() {
    this.props.router.push('/registration');
  }

  render () {
    return (
      <div>
        <input type='text' className='form-control' name='login' id='login-field' placeholder='Login' />
        <br />
        <input type='password' className='form-control' name='password' id='password-field' placeholder='Password' />
        <br />
        <button className='btn btn-success' onClick={this.handleSignInClick}>Login</button>
        <button className='btn btn-primary' onClick={this.handleRegClick}>Registration</button>
      </div>
    );
  }
}
