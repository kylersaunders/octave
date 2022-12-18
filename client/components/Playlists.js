import React, { useState, useEffect } from 'react';

const Playlists = (props) => {
  const { handleClick, results } = props;
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Tracks</th>
          <th>Public List</th>
          <th>Add to</th>
          <th>See tracks</th>
        </tr>
      </thead>
      <tbody>
        {results.map((x) => {
          const { image_url, id, name, tracks, public_vis } = x;
          return (
            <tr>
              <td>
                <img class='playlistImg' src={image_url}></img>
              </td>
              <td>{name}</td>
              <td>{tracks}</td>
              <td>{public_vis}</td>
              <td>
                <input
                  id={`${id}`}
                  className='selectPlaylist'
                  name='selectPlaylist'
                  type='radio'
                  onClick={handleClick}
                ></input>
              </td>
              <td>
                <input
                  id={`${id}`}
                  className='getPlaylistTracks'
                  type='submit'
                  value='Tracks'
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

export default Playlists;
