import React, { useState, useEffect } from 'react';

const RecommendationsParameters = (props) => {
  const { handleClick } = props;
  return (
    <div>
      <h2>Recommendations</h2>

      <form>
        <input
          id='addToPlaylist'
          name='addToPlaylist'
          type='submit'
          value='Add checked songs to checked playlist'
          onClick={handleClick}
        ></input>
      </form>
      {/* <button id='getRecommendations' onClick={handleClick}>
          Get recommendations from selected
        </button> */}
      {/* <div style={'display':'flex'}> */}
      <form>
        <input type='text' id='minBPM' placeholder='minimum BPM'></input>
        <input type='text' id='maxBPM' placeholder='maximum BPM'></input>
        <input
          type='number'
          id='playlistLimit'
          placeholder='#'
          min={0}
          max={50}
        ></input>
        <button name='getRecommendations' onClick={handleClick}>
          Create new playlist
        </button>
      </form>
      {/* </div> */}
    </div>
  );
};

export default RecommendationsParameters;
