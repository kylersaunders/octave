import React, { useState, useEffect } from 'react';

const Navbar = (props) => {
  return (
    <div id='header'>
      <h1>Octave</h1>
      <h4>Because it's a play on music words..</h4>
      <form action='/login'>
        <input type='submit' value='Authorize w/Spotify'></input>
      </form>
      <form action='/refresh_token'>
        <input type='submit' value='Refresh Spotify Auth'></input>
      </form>
    </div>
  );
};
export default Navbar;
