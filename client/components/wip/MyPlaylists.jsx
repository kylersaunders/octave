import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  addPlaylistTracks,
  updateMyPlaylists,
} from '../reducers/buildPlaylistSlice';
import { getMyPlaylists } from '../../utils/endpointFunctions';

const MyPlaylists = (props) => {
  const { myPlaylists } = props;
  const dispatch = useDispatch();

  const playlistOffset = 1;
  useEffect(() => {
    dispatch(updateMyPlaylists(getMyPlaylists(playlistOffset)));
  }, []);

  return (
    <div>
      <h2>Your Playlists</h2>
      <button
        id='getUsersPlaylists'
        name='getMyPlaylists'
        // onClick={handleClick}
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
      <form>
        <input
          id='newPlaylistName'
          type='text'
          placeholder='new playlist name here'
        ></input>
        <button name='createPlaylist'>Create new playlist</button>
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
          {myPlaylists.map((x) => {
            const { image_url, id, name, tracks, public_vis } = x;
            return (
              <tr>
                <td>
                  <img className='playlistImg' src={image_url}></img>
                </td>
                <td>{name}</td>
                <td>{tracks}</td>
                <td>{public_vis}</td>
                <td>
                  <input
                    id={`${id}`}
                    name='selectPlaylist'
                    type='radio'
                    // onClick={handleClick}
                  ></input>
                </td>
                <td>
                  <input
                    id={`${id}`}
                    name='getPlaylistTracks'
                    type='submit'
                    value='Tracks'
                    // onClick={handleClick}
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

function mapStateToProps(state) {
  return {
    myPlaylists: state.playlistTracks.myPlaylists,
  };
}

export default connect(mapStateToProps)(MyPlaylists);
