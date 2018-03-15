import React, { Component } from 'react';
import axios from 'axios';

export default class login extends Component {
  constructor(props) {
    super (props);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleRegClick = this.handleRegClick.bind(this);
    console.log(props)
  }

  handleSignInClick() {
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
    this.props.router.push('/registration')
  }


  render() {
    return (
      <div>
        <div className="field">
          <label htmlFor="login-field">Login: </label>
          <input type="text" name="login" id="login-field"/>
        </div>
        <br/>
        <div className="field">
          <label htmlFor="password-field">Password: </label>
          <input type="password" name="password" id="password-field"/>
        </div>
        <br/>
        <button onClick={this.handleSignInClick}>Login</button>
        <br/>
        <br/>
        <button onClick={this.handleRegClick}>Registration</button>
      </div>
    )
  }
}


