//react
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

//react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//react-redux
import { Provider } from 'react-redux';
import store from './store';

//import styles
import styles from './scss/application.scss';

//import main components
import App from './components/App';
import ErrorPage from './components/ErrorPage';

//import level 1 components
import BuildWorkout from './components/BuildWorkout';
// import SearchSpotify from './components/SearchSpotify';
// import GetRecommendations from './components/GetRecommendations';
import MyAccount from './components/MyAccount';
import MySavedWorkouts from './components/MySavedWorkouts';
import MyPlaylists from './components/MyPlaylists';

//import level 2 components
// import SelectFeeder from './components/subcomponents/SelectFeeder';

//testing new ui background
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
});
let c = document.getElementsByTagName('canvas')[0],
  x = c.getContext('2d'),
  pr = window.devicePixelRatio || 1,
  w = window.innerWidth,
  h = 400, //window.innerHeight;
  f = 90,
  q,
  m = Math,
  r = 0,
  u = m.PI * 2,
  v = m.cos,
  z = m.random;
c.width = w * pr;
c.height = h * pr;
x.scale(pr, pr);
x.globalAlpha = 0.6;

function i() {
  x.clearRect(0, 0, w, h);
  q = [
    { x: 0, y: h * 0.7 + f },
    { x: 0, y: h * 0.7 - f },
  ];
  while (q[1].x < w + f) d(q[0], q[1]);
}

function d(i, j) {
  x.beginPath();
  x.moveTo(i.x, i.y);
  x.lineTo(j.x, j.y);
  let k = j.x + (z() * 2 - 0.25) * f,
    n = y(j.y);
  x.lineTo(k, n);
  x.closePath();
  r -= u / -50;
  x.fillStyle =
    '#' +
    (
      ((v(r) * 127 + 128) << 16) |
      ((v(r + u / 3) * 127 + 128) << 8) |
      (v(r + (u / 3) * 2) * 127 + 128)
    ).toString(16);
  x.fill();
  q[0] = q[1];
  q[1] = { x: k, y: n };
}

function y(p) {
  var t = p + (z() * 2 - 1.1) * f;
  return t > h || t < 0 ? y(p) : t;
}

document.onclick = i;
document.ontouchstart = i;
i();

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
