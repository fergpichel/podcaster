import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './src/js/components/App.js';

import './src/css/main.css';

ReactDOM.render((
	<BrowserRouter>
	  <App />
	</BrowserRouter>
  ), document.getElementById('app')
 );

 $(document).ready(function(){
	if (module.hot) {
		module.hot.accept();
	}
});