import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'i18n/i18n';

ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}
