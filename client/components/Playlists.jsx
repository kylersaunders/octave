import React, { useState, useEffect } from 'react';
// import * as styles from ('./Playlists.module.scss')

const Playlists = (props) => {
  const { handleClick, results } = props;
  return (
    <div>
      <h2>Your Playlists</h2>
      <button
        id='getUsersPlaylists'
        className='getMyPlaylists'
        onClick={handleClick}
      >
        Get my playlists
      </button>
      <input
        type='number'
        id='playlistLimit'
        placeholder='#'
        min={0}
        max={50}
      ></input>
      <form onSubmit={handleClick}>
        <input
          id='newPlaylistName'
          type='text'
          placeholder='new playlist name here'
        ></input>
        <button className='createPlaylist' onClick={handleClick}>
          Create new playlist
        </button>
      </form>
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
    </div>
  );
};

export default Playlists;