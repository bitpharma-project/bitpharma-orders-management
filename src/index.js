import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { ordersReducer } from './store/orders/ordes-reducer';
import { Provider } from 'react-redux';
import App from './components/app/App';
require('babel-polyfill');

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(),
  // other store enhancers if any
);

const store = createStore(ordersReducer, enhancer);

// THIS IS DANGEROUS, PLEASE REMOVE WHEN API IS SERVER OVER HTTPS.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);