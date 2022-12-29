import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default () => {
  return (
    <div id='navbar'>
      <ul>
        <li>
          <Link to={'BuildWorkout/'}>'Build Workout'</Link>
        </li>
        <li>
          <Link to={'SearchSpotify/'}>'Search Spotify'</Link>
        </li>
        <li>
          <Link to={'GetRecommendations/'}>'Get Recommendations'</Link>
        </li>
        <li>
          <Link to={'MyAccount/'}>'My Account'</Link>
        </li>
        <li>
          <Link to={'MySavedWorkouts/'}>'My Saved Workouts'</Link>
        </li>
        <li>
          <Link to={'MyPlaylists/'}>'My Playlists'</Link>
        </li>
        <li></li>
        <li>Refresh Auth</li>
        <li>Log out</li>
      </ul>
    </div>
  );
};
