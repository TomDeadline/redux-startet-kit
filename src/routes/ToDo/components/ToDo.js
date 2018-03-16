import React, { Component } from 'react';
import Note from './Note';
import EditNote from './EditNote';
import axios from 'axios';
import './ToDo.scss'

export default class ToDo extends Component {
  constructor (props) {
    super(props);
    this.state = {array: [], words: [], through: []};
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.save = this.save.bind(this);
    this.checkboxClick = this.checkboxClick.bind(this);
  }

  componentWillMount () {
    console.log('8===э');
    axios.get('/todo')
      .then((response) => {
        let textArr = response.data.text;
        let throughArr = response.data.isThrough;
        for (let i = 0; i < textArr.length; i++) {
          let elementNode = <Note
            delete={this.deleteNote}
            edit={this.editNote}
            value={textArr[i]}
            checkFlag={throughArr[i]}
            through={this.state.through}
            checkboxClick={this.checkboxClick}
          />;
          let wordOfArray = this.state.words;
          let flag = this.state.through;
          this.setState({ array: [...this.state.array, elementNode] });
          wordOfArray.push(textArr[i]);
          flag.push(throughArr[i]);
        }
      });
  }

  addNote () {
    let elementNode = <Note
      delete={this.deleteNote}
      edit={this.editNote}
      value={document.getElementById('listItem').value}
      through={this.state.through}
      checkFlag={false}
      checkboxClick={this.checkboxClick}
    />;

    let wordOfArray = this.state.words;
    let flag = this.state.through;
    this.setState({ array: [ ...this.state.array, elementNode ] });
    wordOfArray.push (document.getElementById('listItem').value);
    flag.push (false);
    document.getElementById('listItem').value = '';


    axios.post('/addnote', {
      text: this.state.words[this.state.words.length - 1],
      isThrough: this.state.through[this.state.through.length - 1]
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(this.state.words);
    console.log(this.state.through);

  }

  deleteNote (ourItem) {
    this.setState({ ...this.state.through.splice(ourItem, 1) });
    this.setState({ ...this.state.words.splice(ourItem, 1) });
    this.setState({ ...this.state.array.splice(ourItem, 1) });

    axios.post('/deletenote', {
      itemNumber: ourItem
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(this.state.words);
    console.log(this.state.through);
  }

  editNote (ourItem) {
    this.setState({ ...this.state.array.splice (ourItem, 1, <EditNote
      boroda={this.state.words[ourItem]}
      save={this.save} />) });

    console.log(this.state.words);
    console.log(this.state.through);
  }

  save(ourItem) {
    let elementNote = <Note
      delete={this.deleteNote}
      edit={this.editNote}
      value={document.getElementById('editItem').value}
      through={this.state.through}
      checkFlag={false}
      checkboxClick={this.checkboxClick}
    />;
    this.setState({ ...this.state.array.splice(ourItem, 1, elementNote) });
    this.setState({ ...this.state.words.splice(ourItem, 1, document.getElementById('editItem').value) });
  }
  checkboxClick (ourItem) {
    this.setState({ ...this.state.through.splice(ourItem, 1, !this.state.through[ourItem]) });
    let elementNote = <Note
      delete={this.deleteNote}
      edit={this.editNote}
      value={this.state.words[ourItem]}
      through={this.state.through}
      checkFlag={this.state.through[ourItem]}
      checkboxClick={this.checkboxClick}
    />;
    this.setState({ ...this.state.array.splice(ourItem, 1, elementNote) });
  }

  logOut () {
    axios.get('/logout', {
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
    const listItems = this.state.array.map((item, index) => <li className='list-group-item' key={index} id={index}>{item}</li>);
    return (
      <div>
        <div className='list-group-item'>
          <input className='form-control width-70' type='text' id='listItem' />
          <button className='btn btn-success' onClick={this.addNote}>Add Note</button>
        </div>
        <ul className='list-group'>
          {listItems}
        </ul>
        <br />
        <div>
          <button className='btn btn-primary' onClick={this.logOut}>Logout</button>
        </div>
      </div>
    );
  }
}
