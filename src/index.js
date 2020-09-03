import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'semantic-ui-css/semantic.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/jquery/dist/jquery.slim.js'
import '../node_modules/popper.js/dist/umd/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';


ReactDOM.render(
  <React.StrictMode>
        <App/>
  </React.StrictMode>,
  document.getElementById('root')
);