import React, {Component} from 'react'
import PropTypes from 'prop-types'

/*
* Book component that renders a book.
*/
class Book extends Component{

  static propTypes = {
    bookObj        : PropTypes.object.isRequired,
    onShelfChange  : PropTypes.func.isRequired
  }

  render(){

    // Deconstruct.
    const {bookObj, onShelfChange} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(bookObj.imageLinks)? bookObj.imageLinks.thumbnail : ""})` }}></div>
            <div className="book-shelf-changer">
              <select value={bookObj.shelf} onChange={(evt) => onShelfChange(evt, bookObj)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookObj.title}</div>
          <div className="book-authors">{"" + bookObj.authors}</div>
        </div>
      </li>
    )}
  }

  export default Book;
