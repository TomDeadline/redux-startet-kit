import React, {Component} from 'react';
import axios from 'axios/index';

export default class EditNote extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick (e) {
    const saveItem = e.target.closest('li').id;
    this.props.save(saveItem);

    axios.post('/editnote', {
      itemNumber: saveItem,
      text: document.getElementById('editItem').value
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render () {
    return (
      <div className='input-group'>
        <input type='text' className='form-control' id='editItem' />
        <div className='input-group-btn'>
          <button className='btn btn-success' onClick={this.handleSaveClick}>save</button>
        </div>
      </div>
    );
  }
}
