import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/fonts/sf-ui-display-black-58646a6b80d5a.woff';
import './assets/fonts/sf-ui-display-bold-58646a511e3d9.woff';
import './assets/fonts/sf-ui-display-heavy-586470160b9e5.woff';
import './assets/fonts/sf-ui-display-light-58646b33e0551.woff';
import './assets/fonts/sf-ui-display-medium-58646be638f96.woff';
import './assets/fonts/sf-ui-display-semibold-58646eddcae92.woff';
import './assets/fonts/sf-ui-display-thin-58646e9b26e8b.woff';
import './assets/fonts/sf-ui-display-ultralight-58646b19bf205.woff';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
