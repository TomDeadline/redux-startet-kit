import React, { Component } from 'react';
import Note from './Note';
import EditNote from './EditNote';
import axios from 'axios';
import firstNote from './firstNote';

export default class ToDo extends Component {
  constructor (props) {
    super(props);
    this.state = {array: [], words: [], through: []};
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount () {
    axios.get('/todo')
      .then((response) => {
        console.log(response.data.text);
        console.log(response.data.isThrough);

        let textArr = response.data.text;
        let throughArr = response.data.isThrough;

        // for (let i = 0; i < textArr.length; i++) {
        //
        //   let elementNode = <Note
        //     delete={this.deleteNote}
        //     edit={this.editNote}
        //     value={textArr[i]}
        //     checkFlag={throughArr[i]}
        //   />;
          let wordOfArray = this.state.words;
          let flag = this.state.through;
          //this.setState({array: [...this.state.array, elementNode]});
          wordOfArray.push(textArr);
          flag.push(throughArr);
        // }
      })
  }
 // handleCheckboxClick(flag) {
 //    let isChecked = flag;
 //
 //    let stateArray = this.state.array;
 //    stateArray[flag].isChecked = true;
 //    this.setState(...this.state.array,)
 // }

  addNote () {
    let elementNode = <Note
      delete={this.deleteNote}
      edit={this.editNote}
      value={document.getElementById('listItem').value}
      through={this.state.through}
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
    this.setState({...this.state.array.splice (ourItem, 1, <EditNote save={this.save}/>)});

    console.log(this.state.words);
    console.log(this.state.through);
  }

  save(ourItem) {
    let elementNote = <Note
      delete={this.deleteNote}
      edit={this.editNote}
      value={document.getElementById('editItem').value}
      through={this.state.through}
    />;
    this.setState({ ...this.state.array.splice(ourItem, 1, elementNote) });
    this.setState({ ...this.state.words.splice(ourItem, 1, document.getElementById('editItem').value) });
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
    const listItems = this.state.array.map((item, index) => <li key={index} id={index}>{item}</li>);

    return (
      <div>
        <div>
          <input type='text' id='listItem' />
          <button onClick={this.addNote}>Add Note</button>
        </div>
        <ul>
        {listItems}
        </ul>
        <div>
          <button onClick={this.logOut}>Logout</button>
        </div>
      </div>
    );
  }
}
