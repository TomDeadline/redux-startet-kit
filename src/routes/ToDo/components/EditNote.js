import React, {Component} from 'react';
import axios from 'axios/index';

export default class EditNote extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSaveClick (e) {
    const saveItem = e.target.closest('li').id;
    console.log(e);
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

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleSaveClick(e);
    }
  }

  render () {
    return (
      <div className='input-group'>
        <input type='text' autoFocus className='form-control' id='editItem' rows='1' defaultValue={this.props.boroda} onKeyPress={this.handleKeyPress} />
        <div className='input-group-btn'>
          <button className='btn btn-success save' onClick={this.handleSaveClick}>save</button>
        </div>
      </div>
    );
  }
}
