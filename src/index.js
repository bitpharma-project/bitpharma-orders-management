import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { ordersReducer } from './store/orders/ordes-reducer';
import { Provider } from 'react-redux';
import App from './components/app/App';

const store = createStore(ordersReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);