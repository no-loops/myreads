import React, {Component} from 'react'
import Book from './Book'
import * as BooksAPI from '../utils/BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'

/*
* SearchBooks component that renders the search page.
*/
class SearchBooks extends Component{

  componentDidMount(props){
    this.setState({queryStr: ""});
  }

  state = {
    queryStr      : "",
    searchResults : []
  }

  /* Callback when the user types in the search field.*/
  updateQuery(query){
    // Escape the query string.
    query  = escapeRegExp(query.trim());

    // Hold on to the allBooks prop.
    var allBooks = this.props.allBooks;

    // Set the state.
    this.setState({queryStr: query})

    // If the query is truthy.
    if(query){
      // Call the API and wait on the promise.
      BooksAPI.search(query, 10).then((searchResults) => {
        // If the search errored, Set the searchResults to empty and return.
        if(searchResults.error){
          this.setState({searchResults: []});
          return;
        }

        // For some reason, The search results have duplicate ids. Not sure if
        // others have the same issue. I see "Mastering React" appear twice : Id "47FKDAAAQBAJ"
        // when I search for "React".
        // Make a unique list of search results.
        var uniqueResults = [];
        searchResults.filter(function(obj){
          var i = uniqueResults.findIndex(tmp => tmp.id === obj.id);
          if(i <= -1){
            uniqueResults.push(obj);
          }
          return '';
        });

        // For all the search results. Set the shelf value because search results are
        // generic.
        var ids = allBooks.map(obj => {return obj.id});
        for(var i=0; i < uniqueResults.length; i++){
          let index = ids.indexOf(searchResults[i].id)
          if(index > -1){
            uniqueResults[i].shelf = allBooks[index].shelf;
          }
        }

        // Set the state. Will cause the search page to render.
        this.setState({searchResults: uniqueResults});
      })
    }else{
      // There was nothing to search, clear out the search page.
      this.setState({searchResults: []});
    }
  }

  render(){

    // Deconstruct.
    const {onShelfChange} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.queryStr}
              onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((bookObj) => (
              <Book key={bookObj.id} bookObj={bookObj} onShelfChange={onShelfChange}/>
            ))}
          </ol>
        </div>
      </div>
    )}
  }

  export default SearchBooks;
