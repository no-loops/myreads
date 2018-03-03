import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as ACTIONS from '../actions';

/*
* Book component that renders a book.
*/
class Book extends Component{

  static propTypes = {
    bookObj : PropTypes.object.isRequired
  }

  state = {};

  onShelfChange(evt, bookObj){
    this.props.updateShelfOnBook(bookObj, evt.target.value);

    bookObj.shelf = evt.target.value;
    this.setState({bookObj: bookObj});
  }

  componentWillMount(){
    const {bookObj} = this.props;
    this.setState({bookObj: bookObj});
  }

  render(){
    // Deconstruct.
    const {bookObj} = this.state;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(bookObj.imageLinks)? bookObj.imageLinks.thumbnail : ""})` }}></div>
            <div className="book-shelf-changer">
              <select value={bookObj.shelf} onChange={(evt) => this.onShelfChange(evt, bookObj)}>
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

  // Dispatch an action to update the bookshelf on the bookobj.
  function mapDispatchToProps (dispatch) {
    return {
      updateShelfOnBook: (book, newShelf) => dispatch(ACTIONS.updateShelfOnBook(book, newShelf))
    }
  }

export default connect(null, mapDispatchToProps)(Book);
