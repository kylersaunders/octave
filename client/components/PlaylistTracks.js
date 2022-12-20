import React, { useState, useEffect } from 'react';

const PlaylistTracks = (props) => {
  const { handleClick, results, playIcon } = props;
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Artists</th>
          <th>Popularity</th>
          <th>Mins</th>
          <th>BPM</th>
          <th>Get Recs</th>
        </tr>
      </thead>
      <tbody>
        {results.map((x) => {
          const {
            preview_url,
            id,
            name,
            popularity,
            artists_names,
            duration_ms,
          } = x;
          return (
            <tr>
              <td>
                <a target='_blank' href={preview_url}>
                  <img height='20px' class='play' src={playIcon}></img>
                </a>
              </td>
              <td>{name}</td>
              <td>{artists_names}</td>
              <td>{popularity}</td>
              <td>{(duration_ms / 1000 / 60).toFixed(2)}</td>
              <td>TBD</td>
              <td>
                <input
                  id={`${id}`}
                  className='getRecommendations'
                  type='submit'
                  value='Seed'
                  onClick={handleClick}
                ></input>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlaylistTracks;
