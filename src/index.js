import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { ordersReducer } from './store/orders/ordes-reducer';
import { Provider } from 'react-redux';
import App from './components/app/App';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import Orders from './components/orders/Orders';

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

ReactDOM.render(
    <Provider store={store}>
        <Router>
          <div>
            <Route path='/' component={App} />
            <Route path='/orders' component={Orders} />
            <Route path='/login' component={Login} />
          </div>
      </Router>
    </Provider>,
    document.getElementById('root')
);