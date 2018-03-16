import React, { Component } from 'react';
import './Note.scss';
import axios from 'axios/index';

class Note extends Component {
  constructor (props) {
    super(props);
    this.state = { class: 'line-none' };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleDeleteClick (e) {
    const deleteItem = e.target.closest('li').id;
    this.props.delete(deleteItem);
  }

  handleEditClick (e) {
    const editItem = e.target.closest('li').id;
    this.props.edit(editItem);
  }

  handleCheckboxClick (e) {
    const checkItem = e.target.closest('li').id;
    axios.post('/turncheck', {
      itemNumber: checkItem
    })
      .then((response) => {
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.checkboxClick(checkItem);
  }
  prepareUranus () {
    if (this.props.checkFlag.toString() === 'false') {
      return <label className='list-group-item-text textBoroda'>{this.props.value}</label>;
    } else {
      return <del className='list-group-item-text line-through textBoroda'>{this.props.value}</del>;
    }
  }

  render () {
    return (
      <div className='Note'>
        {this.prepareUranus()}
        <button className='btn btn-warning edit' onClick={this.handleEditClick}>edit</button>
        <button className='btn btn-danger delete' onClick={this.handleDeleteClick}>X</button>
        <input className='checkbox' onClick={this.handleCheckboxClick} type='checkbox' />
      </div>
    );
  }
}

export default Note;
