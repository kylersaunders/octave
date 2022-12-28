import React, { useState, useEffect } from 'react';
// import { Route, Routes, navigate } from 'react-router-dom';
import { traceDeprecation } from 'process';
import { parse } from 'querystring';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Router,
  Switch,
  Link,
} from 'react-router-dom';

//import components
import Recommendations from './Recommendations.jsx';
import PlaylistTracks from './PlaylistTracks.jsx';
import Playlists from './Playlists.jsx';
import Navbar from './Navbar.jsx';
import Search from './Search.jsx';
import Login from './Login.jsx';
import Title from './Title.jsx';
import Div1 from './Div1.jsx';
import Div2 from './Div2.jsx';
import Div3 from './Div3.jsx';

//OPTION components
import MyAccount from './MyAccount.jsx';
import BuildWorkout from './BuildWorkout.jsx';
import BuildClass from './BuildClass.jsx';

//import styles
// import './app.css';

//import helper functions
import { parseResults, playIcon } from '../utils/helperFunctions';
import { buildRecQueryString, trackAttributes } from '../utils/endpointQueries';
import {
  getSearch,
  createPlaylist,
  getMyPlaylists,
  getPlaylistTracks,
  getRecommendations,
  addToPlaylist,
  logIn,
} from '../utils/endpointFunctions';

//render App
const App = () => {
  //lists to populate components
  const [searchResults, updateSearchResults] = useState([]);
  const [recommendations, updateRecommendations] = useState([]);
  const [playlists, updatePlaylists] = useState([]);
  const [pTracks, updatePTracks] = useState([]);

  //assisting vars
  const [playlistOffset, incrementPlaylistOffset] = useState(0);
  const [loggedIn, setLoggedIn] = useState('');
  const [showNav, setShowNav] = useState(false);

  let lastClicked;
  let tracksToAdd = {};

  // window.onSpotifyIframeApiReady = (IFrameAPI) => {
  //   console.log('SPOTIFY', window.onSpotifyIframeApiReady, IFrameAPI);
  //   let base = document.getElementById('root');
  //   let element = document.createElement('div');
  //   element.setAttribute('id', 'embed-iframe');
  //   let button = document.createElement('button');
  //   button.setAttribute('id', 'testBtn');
  //   button.setAttribute(
  //     'data-spotify-id',
  //     'spotify:episode:6I3ZzCxRhRkNqnQNo8AZPV'
  //   );
  //   element.appendChild(button);
  //   base.appendChild(element);
  //   let options = {
  //     width: '60%',
  //     height: '200',
  //     // uri: 'spotify:episode:43cbJh4ccRD7lzM2730YK3',
  //     uri: 'spotify:episode:1oj4KLsbYhvfHFnhdb3twP',
  //   };
  //   let callback = (EmbedController) => {
  //     let x = document.getElementById('testBtn');
  //     x.addEventListener('click', () => {
  //       EmbedController.loadUri(x.dataset.spotifyId);
  //     });
  //   };
  //   IFrameAPI.createController(element, options, callback);
  // };

  //switchboard based on click
  const handleClick = async (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'login':
        fetch('/login');
      // let login = await logIn();
      // setLoggedIn(() => {
      //   return login;
      // });
      case 'getSearchSubmit':
        let sResults = await getSearch(e);
        // console.log('sResults', sResults);
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
        let recs = await getRecommendations(queryString);
        recs = parseResults(recs);
        updateRecommendations(() => {
          return recs;
        });
        return;
      case 'getMyPlaylists':
        console.log('getting');
        let lists = await getMyPlaylists(playlistOffset);
        updatePlaylists(() => {
          return lists;
        });
        incrementPlaylistOffset((prev) => {
          return prev + 1;
        });
        return;
      case 'getPlaylistTracks':
        let listTracks = await getPlaylistTracks(e);
        listTracks = parseResults(listTracks);
        updatePTracks(() => {
          return listTracks;
        });
        return;
      case 'addToPlaylist':
        addToPlaylist(tracksToAdd);
        return;
      default:
        console.log('Nothing scheduled for this click', e.target.name);
        return;
    }
  };

  const divOneRoutes = [
    {
      key: 'myAccount',
      path: '/',
      component: MyAccount,
      exact: true,
    },
    {
      key: 'buildWorkout',
      path: '/buildWorkout',
      component: BuildWorkout,
      exact: true,
    },
    // {
    //   key: 'savedWorkouts',
    //   path: '/savedWorkouts',
    //   component: SavedWorkouts,
    //   exact: true,
    // },
    // {
    //   key: 'searchSpotify',
    //   path: '/searchSpotify',
    //   component: SearchSpotify,
    //   exact: true,
    // },
    // {
    //   key: 'getRecommendations',
    //   path: '/getRecommendations',
    //   component: GetRecommendations,
    //   exact: true,
    // },
    // {
    //   key: 'myPlaylists',
    //   path: '/myPlaylists',
    //   component: MyPlaylists,
    //   exact: true,
    // },
  ];

  return (
    <>
      <Title setShowNav={setShowNav} />
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div id='main'>
        <div></div>
        <div>
          <Router>
            {/* <Switch> */}
            <Route exact path={['/', '/settings', '/settings/*']}>
              {/* <Switch> */}
              {divOneRoutes.map((x) => (
                <x.component {...x} />
              ))}
              {/* </Switch> */}
            </Route>
            {/* </Switch> */}
          </Router>
          <Div1 />
          <Div2 />
        </div>
        <Div3 />
      </div>
      {/* <BuildClass />
      <Search
        results={searchResults}
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
      /> */}
      <p id='credit'>Background effect provided by saunders.io</p>
    </>
  );
};

export default App;
