import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
//import App from './components/app/App';
import AppHeader from './components/app-header/app-header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppHeader/>
  </React.StrictMode>
);

