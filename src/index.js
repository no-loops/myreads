import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

// Allow the Redux Dev tools to work.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store, use thunk because the update to the store is Async.
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

// Provide the store and render the app.
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
