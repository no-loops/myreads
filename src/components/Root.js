import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf';
import * as ACTIONS from '../actions';
import {connect} from 'react-redux';
// import SearchBooks from './SearchBooks'

class Root extends Component {

  componentWillMount(){
    const {getAllBooks} = this.props;
    getAllBooks();
  }

  render() {
    const {allBooks}        = this.props;
    const wantToRead        = allBooks.filter((book) => {return book.shelf === "wantToRead"});
    const currentlyReading  = allBooks.filter((book) => {return book.shelf === "currentlyReading"});
    const read              = allBooks.filter((book) => {return book.shelf === "read"});

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
              <Bookshelf bookshelfTitle="Want To Read"      books={wantToRead}/>
              <Bookshelf bookshelfTitle="Currently Reading" books={currentlyReading}/>
              <Bookshelf bookshelfTitle="Read"              books={read}/>
            </div>
            <div className="open-search">
              <Link to={{pathname:"/search", state:{allBooks: allBooks}}}>Add a book</Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}
}

// Get a list of posts and categories.
const mapStateToProps = ({books}) => {
  books = books || []
  return {
    allBooks : books
  }
};

// Dispatch, get all categories, posts and actions for sorting.
function mapDispatchToProps (dispatch) {
  return {
    getAllBooks: () => dispatch(ACTIONS.getAllBooks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
