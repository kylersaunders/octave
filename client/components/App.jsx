import React, { useState, useEffect } from 'react';
import { traceDeprecation } from 'process';
import { parse } from 'querystring';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Router,
  Switch,
  Link,
  Outlet,
} from 'react-router-dom';

//import App components
import Login from './Login.jsx';
import Title from './Title.jsx';
import Navbar from './Navbar.jsx';
import ErrorPage from './ErrorPage.jsx';

//import navbar level 1 components
import BuildWorkout from './BuildWorkout.jsx';
import SearchSpotify from './SearchSpotify.jsx';
import GetRecommendations from './GetRecommendations.jsx';
import MyAccount from './MyAccount.jsx';
import MySavedWorkouts from './MySavedWorkouts.jsx';
import MyPlaylists from './MyPlaylists.jsx';

//import detail level 2 components
import PlaylistTracks from './PlaylistTracks.jsx';
import Div3 from './Div3.jsx';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <BuildWorkout />,
      },
      {
        path: '/BuildWorkout/',
        element: <BuildWorkout />,
      },
      {
        path: '/SearchSpotify/',
        element: <SearchSpotify />,
      },
      {
        path: '/GetRecommendations/',
        element: <GetRecommendations />,
      },
      {
        path: '/MyAccount/',
        element: <MyAccount />,
      },
      {
        path: '/MySavedWorkouts/',
        element: <MySavedWorkouts />,
      },
      {
        path: '/MyPlaylists/',
        element: <MyPlaylists />,
      },
    ],
  },
]);

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

  return (
    <>
      <Title setShowNav={setShowNav} />
      <Navbar showNav={showNav} setShowNav={setShowNav} />
      <div id='main'>
        <div></div>
        <div>
          <div id='Div1'>
            <Outlet />
          </div>
          <div id='Div2'>
            <h1>Div2</h1>
          </div>
        </div>
        <Div3 />
      </div>
      <p id='credit'>Background effect provided by saunders.io</p>
    </>
  );
};

export default App;
