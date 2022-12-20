import React, { useState, useEffect } from 'react';
import { parse } from 'querystring';
import { traceDeprecation } from 'process';

//import components
import Recommendations from './Recommendations';
import Playlists from './Playlists';
import PlaylistTracks from './PlaylistTracks';
import Navbar from './Navbar';
import Search from './Search';

//import helper functions
import { parseResults, playIcon } from '../utils/helperFunctions';
import { buildRecQueryString, trackAttributes } from '../utils/endpointQueries';
import {
  getSearch,
  createPlaylist,
  getMyPlaylists,
  getRecommendations,
} from '../utils/endpointFunctions';

//render App
const App = () => {
  const [searchResults, updateSearchResults] = useState([]);
  const [recommendations, updateRecommendations] = useState([]);
  const [playlists, updatePlaylists] = useState([]);
  const [pTracks, updatePTracks] = useState([]);
  const [playlistOffset, incrementPlaylistOffset] = useState(0);

  let lastClicked;
  let tracksToAdd = {};

  const handleClick = async (e) => {
    if (e.target.className === 'selectPlaylist') {
      lastClicked = e.target.id;
    } else if (e.target.className === 'addRecs') {
      tracksToAdd[e.target.id] = tracksToAdd[e.target.id] ? false : true;
    } else {
      e.preventDefault();
    }
    console.log('click', e.target.id);
    switch (e.target.className) {
      case 'getSearchSubmit':
        let sResults = getSearch(e);
        sResults = parseResults(sResults);
        updateSearchResults(() => {
          return sResults;
        });
        return;
      case 'createPlaylist':
        createPlaylist(e);
        return;
      case 'getRecommendations':
        const queryString = buildRecQueryString(e);
        let data = getRecommendations(queryString);
        data = parseResults(data);
        updateRecommendations(() => {
          return data;
        });
        return;
      case 'getMyPlaylists':
        let lists = getMyPlaylists(playlistOffset);
        updatePlaylists(() => {
          return lists;
        });
        incrementPlaylistOffset((prev) => {
          return prev + 1;
        });
        return;
      case 'getPlaylistTracks':
        let listTracks = getPlaylistTracks();
        listTracks = parseResults(listTracks);
        updatePTracks(() => {
          return listTracks;
        });
        return;
      case 'addToPlaylist':
        addToPlaylist(tracksToAdd);
        return;
      case 'addRecs':
        console.log('ID', tracksToAdd, lastClicked);
        return;
      case 'selectPlaylist':
        console.log('ID', tracksToAdd, lastClicked);
        return;
      default:
        console.log('Nothing scheduled for this click');
        return;
    }
  };

  return (
    <div>
      <Navbar />
      <Search
        searchResults={searchResults}
        handleClick={handleClick}
        playIcon={playIcon}
      />
      <Recommendations
        results={recommendations}
        handleClick={handleClick}
        playIcon={playIcon}
      />
      <Playlists
        results={playlists}
        handleClick={handleClick}
        playIcon={playIcon}
      />
      <h2>Playlist Tracks</h2>
      <PlaylistTracks
        results={pTracks}
        handleClick={handleClick}
        playIcon={playIcon}
      />
    </div>
  );
};

export default App;
