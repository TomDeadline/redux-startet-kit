import React, { Component } from 'react'
import axios from 'axios';

export default class registration extends Component {
  constructor (props) {
    super(props)
    this.handleRegClick = this.handleRegClick.bind(this)

    console.log(props)
  }

  handleRegClick () {
    axios.post('registration', {
      password: document.getElementById('regPass').value,
      username: document.getElementById('regUsername').value,
      email: document.getElementById('regEmail').value
    })
      .then((response) => {
        console.log(response)
        this.props.router.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div className="app">
        <label>Enter e-mail: </label>
        <input type="text" id="regEmail"/>
        <br/>
        <br/>
        <label>Enter username: </label>
        <input type="text" id="regUsername"/>
        <br/>
        <br/>
        <label>Enter password: </label>
        <input type="password" id="regPass"/>
        <br/>
        <br/>
        <label>Repeat password: </label>
        <input type="password" id="regPassConfirm"/>
        <br/>
        <br/>
        <button onClick={this.handleRegClick}>Registration</button>
      </div>
    )
  }
}


