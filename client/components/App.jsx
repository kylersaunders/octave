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
  // //lists to populate components
  // const [searchResults, updateSearchResults] = useState([]);
  // const [recommendations, updateRecommendations] = useState([]);
  // const [playlists, updatePlaylists] = useState([]);
  // const [pTracks, updatePTracks] = useState([]);

  // //assisting vars
  // const [playlistOffset, incrementPlaylistOffset] = useState(0);
  // const [loggedIn, setLoggedIn] = useState('');
  // const [showNav, setShowNav] = useState(false);

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
