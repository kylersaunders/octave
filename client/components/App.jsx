//import libraries
import React, { useState, useEffect } from 'react';
import { traceDeprecation } from 'process';
import { parse } from 'querystring';
import { Outlet } from 'react-router-dom';

//import App components
import Title from './Title.jsx';
import Navbar from './Navbar.jsx';
import CreatePlaylist from './CreatePlaylist.jsx';

//render App
const App = () => {
  return (
    <>
      <Title />
      <Navbar />
      <CreatePlaylist />
      <div id='main'>
        <div></div>
        <div id='Div1'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
