import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults.jsx';

const SearchSpotify = () => {
  // const { handleClick, results, playIcon } = props;
  return (
    <>
      <h2>Search Spotify</h2>
      {/* <form id='getSearchForm'> */}
      <input
        id='getSearchInput'
        type='text'
        placeholder='search by track name'
        onSubmit={(e) => e.preventDefault()}
      ></input>
      {/* <button id='getSearchSubmit' name='getSearchSubmit'>
          I'm feeling lucky
        </button> */}
      {/* </form> */}
      <div id='searchResults'></div>
    </>
  );
};

// export default SearchSpotify;
