import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/*
* Bookshelf component that renders a bookshelf.
*/
class Bookshelf extends Component{

  // Define Required Properties.
  static propTypes = {
    bookshelfTitle : PropTypes.string.isRequired,
    books          : PropTypes.array.isRequired
  }

  render(){
    // Deconstruct.
    const {books, bookshelfTitle} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(bookObj => (
              <Book key={bookObj.id} bookObj={bookObj}/>
            ))
          }
        </ol>
      </div>
    </div>
  )}
}

export default Bookshelf;
