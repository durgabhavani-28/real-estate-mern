import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import {store, persistor} from './redux/store.js'; // Import the Redux store
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
