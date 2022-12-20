import React, { useState, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks';

const Search = (props) => {
  const { handleClick, searchResults, playIcon } = props;
  return (
    <div>
      <h2>Search Spotify</h2>
      <form id='getSearchForm' onSubmit={handleClick}>
        <input
          id='getSearchInput'
          type='text'
          placeholder='search by track name'
        ></input>
        <button
          id='getSearchSubmit'
          className='getSearchSubmit'
          onClick={handleClick}
        >
          I'm feeling lucky
        </button>
      </form>
      <div id='searchResults'>
        <PlaylistTracks
          results={searchResults}
          handleClick={handleClick}
          playIcon={playIcon}
        />
      </div>
    </div>
  );
};
export default Search;
