import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Main react component
import App from './components/App';

// Redux front-end application state
import store from '../store';

// Styles
import './assets/styles/style.scss';

// Initialize React.JS GameUI
class GameUI {
  render() {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }
}

export default GameUI;
