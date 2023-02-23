//import libraries
import React, { useState, useEffect } from 'react';
import { traceDeprecation } from 'process';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//import App components
import Title from './Title';
import Navbar from './Navbar';
import CreatePlaylist from './CreatePlaylist';

//render App
const App = () => {
  return (
    <>
      <Toaster />
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
