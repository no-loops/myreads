import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Root from './components/Root';
import SearchBooks from './components/SearchBooks';
import './App.css'

class App extends Component {

  render() {
    // Only two basic routes, The main page and the search page.
    return (
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/search" component={SearchBooks} />
      </Switch>
    );
  }
}

export default App;
