import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {

  constructor(props) {
    super(props);
    // Bind the handler so that it can access this.
    this.moveBookToBookshelf = this.moveBookToBookshelf.bind(this);
  }

  /* State Object*/
  state = {
    allBooks : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks});
    })
  }

  /* Callback when the dropdown option is selected on a book from either the search
  *  or from the main page. */
  moveBookToBookshelf(evt, book){
    // Send the value to the API to update.
    BooksAPI.update(book, evt.target.value);

    // Blindly update the bookshelf value on the bookobject and update the state.
    book.shelf = evt.target.value;
    var books  = this.state.allBooks.filter((obj) => obj.id !== book.id);
    books.push(book);
    this.setState({allBooks:books});
  }

  render() {
    return (
      <div>
        {/* Render the main page.*/ }
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {/* Create a bookshelf component that accepts a list of book objects and displays them..*/ }
              <div className="list-books-content">
                <Bookshelf bookshelfTitle="Want To Read"      books={this.state.allBooks.filter((book) => {return book.shelf === "wantToRead"})}       onShelfChange={this.moveBookToBookshelf}/>
                <Bookshelf bookshelfTitle="Currently Reading" books={this.state.allBooks.filter((book) => {return book.shelf === "currentlyReading"})} onShelfChange={this.moveBookToBookshelf}/>
                <Bookshelf bookshelfTitle="Read"              books={this.state.allBooks.filter((book) => {return book.shelf === "read"})}             onShelfChange={this.moveBookToBookshelf}/>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
          />

        {/* Render the search page.*/ }
        <Route path="/search" render={() => (
              <SearchBooks onShelfChange={this.moveBookToBookshelf} allBooks={this.state.allBooks}></SearchBooks>
          )}
          />
      </div>
    );
  }
}

export default BooksApp
