import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Root from './components/Root';
import SearchBooks from './components/SearchBooks';
import './App.css'

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/search" component={SearchBooks} />
        {/* <Route exact path="/posts/category/:category" component={AddEditPost} />
        <Route exact path="/comments/:postId" component={AddEditComment} />
        <Route exact path="/comments/:postId/:commentId" component={AddEditComment} />
        <Route exact path="/:category" component={Category} />
        <Route exact path="/:category/:postId" component={PostDetail} /> */} */}
      </Switch>
    );
  }
}

export default App;
