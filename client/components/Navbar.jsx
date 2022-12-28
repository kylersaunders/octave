import React, { useState, useEffect } from 'react';

const Navbar = (props) => {
  return (
    <div id='navbar'>
      <ul>
        <li id='li_build'>Build a workout</li>
        <li id='li_search'>Spearch Spotify</li>
        <li id='li_rec'>Get recommendations</li>
        <li id='li_account'>My account</li>
        <li id='li_saved'>My saved workouts</li>
        <li id='li_playlists'>My playlists</li>
      </ul>
    </div>
  );
};
export default Navbar;
