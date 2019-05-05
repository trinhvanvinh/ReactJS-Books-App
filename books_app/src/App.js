import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {Table, Button,Modal,ModalHeader,ModalBody, ModalFooter,Input,InputGroupAddon,InputGroup,Label,FormGroup} from 'reactstrap';

class App extends Component {

  state={
    books:[],
    newBookData:{
      title:'',
      rating:''
    },
    newBookModal:false
  }

  componentWillMount(){
    axios.get('http://localhost:3000/books').then((response)=>{
      this.setState({
        books:response.data
      })

      console.log(response.data);

    });
  }

  toggleNewBookModal(){
     this.setState({
      newBookModal:!this.state.newBookModal
     })
  }

  addBook(){
    axios.post('http://localhost:3000/books', this.state.newBookData).then((respone)=>{
      console.log(respone.data);

      let {books} =this.state;
      books.push(respone.data);
      this.setState({books,newBookModal:false, newBookData:{
        title:'',
        rating:''
      }});

    });
  }

  render(){

    let books=this.state.books.map((book)=>{
      return (
        <tr key={book.id} >
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.Rating}</td>
        <td>
          <Button color='success' size="sm" >Edit</Button>
          <Button color="danger" size="sm" >Delete</Button>
        </td>
      </tr>
      )
    });

 

  return (
    <div className="App container">

    <h1>Books App</h1>

    <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)} >Add a new book</Button>
    <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
      <ModalHeader toggle={this.toggleNewBookModal.bind(this)} >Modal Title</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title" >Title</Label>
            <Input id="title" value={this.state.newBookData.title}
              onChange={(e)=>{
                let {newBookData}=this.state;
                newBookData.title=e.target.value;
                this.setState({
                  newBookData
                })
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="rating" >Rating</Label>
            <Input id="rating" value={this.state.newBookData.rating} 
              onChange={(e)=>{
                let {newBookData}=this.state;
                newBookData.rating=e.target.value;
                this.setState({
                  newBookData
                })
              }}
            />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)} >Add Book</Button>
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)} >Cancel</Button>
        </ModalFooter>

    </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* <tr>
            <td>1</td>
            <td>Book title</td>
            <td>2.5</td>
            <td>
              <Button color='success' size="sm" >Edit</Button>
              <Button color="danger" size="sm" >Delete</Button>
            </td>
          </tr> */}
          {books}
        </tbody>
      </Table>
    </div>
  )}
}

export default App;
