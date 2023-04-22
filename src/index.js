import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppHeader from './components/app-header/app-header';
import Board from './components/app-board/app-board';
import Sidebar from './components/app-sidebar/app-sidebar';
import data from './data';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppHeader />
    <main className='main'>
      <Sidebar {...data}/>
      <Board {...data}/>
    </main>
  </React.StrictMode>
);

