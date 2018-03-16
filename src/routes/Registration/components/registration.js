import React, { Component } from 'react'
import axios from 'axios';

export default class registration extends Component {
  constructor (props) {
    super(props);
    this.handleRegClick = this.handleRegClick.bind(this)

    console.log(props);
  }

  handleRegClick () {
    axios.post('registration', {
      password: document.getElementById('regPass').value,
      username: document.getElementById('regUsername').value,
      email: document.getElementById('regEmail').value
    })
      .then((response) => {
        console.log(response);
        this.props.router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    return (
      <div className='app'>
        <input type='text' className='form-control' id='regEmail' placeholder='Email' />
        <br />
        <input type='text' className='form-control' id='regUsername' placeholder='Username' />
        <br />
        <input type='password' className='form-control' id='regPass' placeholder='Password' />
        <br />
        <input type='password' className='form-control' id='regPassConfirm' placeholder='Confirm password' />
        <br />
        <button className='btn btn-success' onClick={this.handleRegClick}>Registration</button>
      </div>
    );
  }
}
