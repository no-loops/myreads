import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/*
* Bookshelf component that renders a bookshelf.
*/
class Bookshelf extends Component{

  static propTypes = {
    bookshelfTitle : PropTypes.string.isRequired,
    books          : PropTypes.array.isRequired,
    onShelfChange  : PropTypes.func.isRequired
  }

  render(){

    // Deconstruct.
    const {books, bookshelfTitle, onShelfChange} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(bookObj => (
              <Book key={bookObj.id} bookObj={bookObj} onShelfChange={onShelfChange}/>
            ))
          }
        </ol>
      </div>
    </div>
  )}
}

export default Bookshelf;
