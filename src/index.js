import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './state/store';
import { Provider } from 'react-redux';

ReactDOM.render(<Router><Provider store={store}><div><App /></div></Provider></Router>,document.getElementById('root'));


