import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

//import main components
import App from './components/App';
import ErrorPage from './components/ErrorPage';
import store from './store';

//import level 1 components
import BuildWorkout from './components/BuildWorkout';
// import SearchSpotify from './components/SearchSpotify';
// import GetRecommendations from './components/GetRecommendations';
import MyAccount from './components/MyAccount';
import MySavedWorkouts from './components/MySavedWorkouts';
import MyPlaylists from './components/MyPlaylists';

//import level 2 components
// import SelectFeeder from './components/subcomponents/SelectFeeder';

//initialize router
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
        // children: [
        //   {
        //     path: '/BuildWorkout/SelectFeeder/',
        //     element: <SelectFeeder />,
        //   },
        // ],
      },
      // {
      //   path: '/SearchSpotify/',
      //   element: <SearchSpotify />,
      // },
      // {
      //   path: '/GetRecommendations/',
      //   element: <GetRecommendations />,
      // },
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

//render app
render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('root')
);
