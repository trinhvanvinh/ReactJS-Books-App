import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {Table, Button,Modal,ModalHeader,ModalBody, ModalFooter,Input,Label,FormGroup} from 'reactstrap';

class App extends Component {

  state={
    books:[],
    newBookData:{
      title:'',
      rating:''
    },
    editBookData:{
      id:'',
      title:'',
      rating:''
    },
    newBookModal:false,
    editBookModal:false
  }

  componentWillMount(){
   this._refresApi();
  }

  toggleNewBookModal(){
     this.setState({
      newBookModal:!this.state.newBookModal
     })
  }
  toggleEditBookModal(){
    this.setState({
      editBookModal:!this.state.editBookModal
    });
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

  editBook(id, title, rating){
    console.log(title);
    
    this.setState({
      editBookData:{id,title, rating},
      editBookModal: !this.state.editBookModal
    })

  }

  updateBook(){

    let {title, rating}=this.state.editBookData

    axios.put('http://localhost:3000/books/'+ this.state.editBookData.id,{
      title, rating
    }).then((respone)=>{
     console.log(respone.data);

      this._refresApi();
      this.setState({
        editBookModal:false, editBookData:{
          id:'',
          title:'',
          rating:''
        }
      })
    });
  }

  _refresApi(){
    axios.get('http://localhost:3000/books').then((response)=>{
      this.setState({
        books:response.data
      })

      console.log(response.data);

    });
  }

  deleteBook(id){
    axios.delete('http://localhost:3000/books/'+id).then((response)=>{
     this._refresApi();

    });
  }

  render(){

    let books=this.state.books.map((book)=>{
      return (
        <tr key={book.id} >
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.rating}</td>
        <td>
          <Button onClick={this.editBook.bind(this, book.id, book.title, book.rating)} className="mr-2" color='success' size="sm" >Edit</Button>
          <Button onClick={this.deleteBook.bind(this, book.id)}  color="danger" size="sm" >Delete</Button>
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


    <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.title = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.editBookData.rating} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.rating = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
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
