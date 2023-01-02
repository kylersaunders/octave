import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
// import {
//   addPlaylistTracks,
//   updateMyPlaylists,
// } from '../reducers/buildPlaylistSlice';
import { getMyPlaylists } from '../utils/endpointFunctions';

const MyPlaylists = (props) => {
  const dispatch = useDispatch();
  const {
    sectionId,
    updateShowMyPlaylists,
    updateSeedTracks,
    updateSeedTracksNames,
  } = props;

  const [myPlaylists, updateMyPlaylists] = useState([]);

  useEffect(() => {
    const GMP = async () => {
      const myP = await getMyPlaylists(1, 50);
      updateMyPlaylists(() => myP);
    };
    GMP();
  }, []);

  // const playlistOffset = 1;
  // useEffect(() => {
  //   dispatch(updateMyPlaylists(getMyPlaylists(playlistOffset)));
  // }, []);

  return (
    <>
      <h2>Your Playlists</h2>
      {/* <button
        id='getUsersPlaylists'
        name='getMyPlaylists'
        // onClick={handleClick}
      >
        Get my playlists
      </button> */}
      {/* <input
        type='number'
        id='playlistLimit'
        placeholder='#'
        min={0}
        max={50}
      ></input> */}
      {/* <form>
        <input
          id='newPlaylistName'
          type='text'
          placeholder='new playlist name here'
        ></input>
        <button name='createPlaylist'>Create new playlist</button>
      </form> */}
      <table>
        {/* <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Tracks</th>
            <th>Public List</th>
            <th>See tracks</th>
          </tr>
        </thead> */}
        <tbody>
          {myPlaylists.map((x) => {
            const { image_url, id, name, tracks, public_vis } = x;
            return (
              <tr>
                <td>
                  <img className='playlistImg' src={image_url}></img>
                </td>
                <td>{name}</td>
                <td>{tracks + ' tracks'}</td>
                {/* <td>{public_vis}</td> */}
                <td>
                  <input
                    id={`${id}`}
                    name='getPlaylistTracks'
                    type='submit'
                    value='See tracks'
                    // onClick={handleClick}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

function mapStateToProps(state) {
  return {
    // myPlaylists: state.playlistTracks.myPlaylists,
  };
}

export default connect(mapStateToProps)(MyPlaylists);
