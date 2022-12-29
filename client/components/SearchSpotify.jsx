import React, { useState, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks.jsx';

export default (props) => {
  const { handleClick, results, playIcon } = props;
  return (
    <>
      <h2>Search Spotify</h2>
      <form id='getSearchForm' onSubmit={handleClick}>
        <input
          id='getSearchInput'
          type='text'
          placeholder='search by track name'
        ></input>
        <button
          id='getSearchSubmit'
          name='getSearchSubmit'
          onClick={handleClick}
        >
          I'm feeling lucky
        </button>
      </form>
      <div id='searchResults'>
        <PlaylistTracks
          results={results}
          handleClick={handleClick}
          playIcon={playIcon}
        />
      </div>
    </>
  );
};
