import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import 'materialize-css/dist/css/materialize.min.css';
import reducers from './reducers';

// Axios helpers for development testing
import axios from 'axios';
window.axios = axios;

// 1st arg: Reducer
// 2nd arg: initial state
// 3rd arg: call applyMiddleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);

// console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
// console.log('ENVIRONMENT IS', process.env.NODE_ENV);