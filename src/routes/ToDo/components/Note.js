import React, { Component } from 'react'
import './Note.scss'

class Note extends Component {
  constructor (props) {
    super(props)
    this.state = {class: 'line-none'}
    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
  }

  handleDeleteClick (e) {
    const deleteItem = e.target.closest('li').id
    this.props.delete(deleteItem)
  }

  handleEditClick (e) {
    const editItem = e.target.closest('li').id
    this.props.edit(editItem)
  }

  handleCheckboxClick (e) {
    if (this.state.class === 'line-none') {
      this.setState({class: 'line-through'})
    }
    if (this.state.class === 'line-through') {
      this.setState({class: 'line-none'})
    }
    const checkItem = e.target.closest('li').id;
    this.setState({...this.props.through.splice(checkItem, 1, !this.props.through[checkItem])})
    console.log(this.props.through)

  }

  render () {
    return (
      <div className="ToDoList">
        <label id="textNode" className={this.state.class}>{this.props.value}</label>
        <button onClick={this.handleEditClick}>edit</button>
        <button onClick={this.handleDeleteClick}>delete</button>
        <input onClick={this.handleCheckboxClick} type="checkbox"/>
      </div>
    )
  }
}

export default Note
