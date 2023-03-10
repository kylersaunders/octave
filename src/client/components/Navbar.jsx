import React from 'react';
import { useMemo } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default (props) => {
  const login = () => {
    fetch('/login', { mode: 'no-cors', credentials: 'include' });
  };

  useMemo(() => {
    login();
  }, []);

  return (
    <div id='navbar'>
      <ul>
        {/* <li onClick={login} className={'navLink'}>
          Refresh Spotify Link
        </li> */}
        <li>
          <Link to={'BuildWorkout/'} className={'navLink'}>
            Build Workout
          </Link>
        </li>
        {/* <li>
          <Link to={'SearchSpotify/'} className={'navLink'}>'Search Spotify'</Link>
        </li> */}
        {/* <li>
          <Link to={'GetRecommendations/'} className={'navLink'}>
            Get Recommendations
          </Link>
        </li> */}
        <li>
          <Link to={'MyAccount/'} className={'navLink'}>
            My Account
          </Link>
        </li>
        <li>
          <Link to={'MySavedWorkouts/'} className={'navLink'}>
            My Saved Workouts
          </Link>
        </li>
        <li>
          <Link to={'MyPlaylists/'} className={'navLink'}>
            My Playlists
          </Link>
        </li>
        {/* <li className={'navLink'}>Log out</li> */}
      </ul>
    </div>
  );
};
