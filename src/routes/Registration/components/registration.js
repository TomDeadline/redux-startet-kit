import React, { Component } from 'react';
import axios from 'axios';

export default class registration extends Component {
  constructor (props) {
    super(props);
    this.handleRegClick = this.handleRegClick.bind(this);
  }

  handleRegClick () {
    let data = {
      password: document.getElementById('regPass').value,
      username: document.getElementById('regUsername').value,
      email: document.getElementById('regEmail').value,
      confPass: document.getElementById('regPassConfirm').value
    };
    this.validateData(data);
    axios.post('postRegistration', {
      password: document.getElementById('regPass').value,
      username: document.getElementById('regUsername').value,
      email: document.getElementById('regEmail').value,
      confPass: document.getElementById('regPassConfirm').value
    })
      .then((response) => {
        console.log(response);
        this.props.router.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  validateData (data) {
    if (data.password !== data.confPass) {
      alert('Пароли не совпадают');
    }
    let reEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (data.email.match(reEmail) === null) {
      alert('Невалидный Email');
    }
    let reUsername = /^[\w]{3,}$/;
    if (data.username.match(reUsername) === null) {
      alert('невалидный ник');
    }
    let rePassword = /^[\w]{3,}$/;
    if (data.password.match(rePassword) === null) {
      alert('невалидный пароль');
    }
  }

  render () {
    return (
      <div className='app'>
        <input type='text' className='form-control ' id='regEmail' placeholder='Email' />
        <br />
        <input type='text' className='form-control' id='regUsername' placeholder='Username' />
        <br />
        <input type='password' className='form-control' id='regPass' placeholder='Password' />
        <br />
        <div className='has-error'>
        <input type='password' className='has-error' id='regPassConfirm' placeholder='Confirm password' />
        </div>
        <br />
        <button className='btn btn-success' onClick={this.handleRegClick}>Registration</button>
      </div>
    );
  }
}
