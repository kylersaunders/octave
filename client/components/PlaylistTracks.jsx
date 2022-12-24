import React, { useState, useEffect, useId } from 'react';
//import helper functions
import { playIcon } from '../utils/helperFunctions';

const PlaylistTracks = (props) => {
  const { handleClick, results, playIcon } = props;
  // const ref = useId();

  // function handleClickLocal(e) {
  //   const audio = document.getElementById(`prev+${e.target.id}`);
  //   console.log('click', audio, e.target.id);
  //   audio.paused ? audio.play() : audio.pause();
  // }
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
                {/* <a onClick={handleClickLocal}> */}
                <audio controls src={preview_url} id={'prev' + id}></audio>
                {/* <img id={id} height='20px' class='play' src={playIcon}></img> */}
                {/* </a> */}
              </td>
              <td>{name}</td>
              <td>{artists_names}</td>
              <td>{popularity}</td>
              <td>{(duration_ms / 1000 / 60).toFixed(2)}</td>
              <td>TBD</td>
              <td>
                <input
                  id={`${id}`}
                  name='getRecommendations'
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
