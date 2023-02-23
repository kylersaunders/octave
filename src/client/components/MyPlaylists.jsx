import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
// import {
//   addPlaylistTracks,
//   updateMyPlaylists,
// } from '../reducers/buildPlaylistSlice';
import { getMyPlaylists, deletePlaylist } from '../utils/endpointFunctions';

const MyPlaylists = (props) => {
  const dispatch = useDispatch();
  const {
    sectionId,
    updateShowMyPlaylists,
    updateSeedTracks,
    updateSeedTracksNames,
  } = props;

  const [myPlaylists, updateMyPlaylists] = useState([]);
  const [reload, triggerReload] = useState(false);

  useEffect(() => {
    const GMP = async () => {
      const myP = await getMyPlaylists(1, 50);
      updateMyPlaylists(() => myP);
    };
    GMP();
  }, [reload]);

  return (
    <>
      <h2>Your Playlists</h2>
      <table>
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
                <td>
                  <button
                    id={`seeTracks${id}`}
                    name='getPlaylistTracks'
                    type='button'
                  >
                    See tracks
                  </button>
                </td>
                <td></td>
                <td>
                  <button
                    type='button'
                    id={`del${id}`}
                    onClick={() => {
                      deletePlaylist(id);
                      // triggerReload(reload ? false : true);
                      document.getElementById(`del${id}`).remove();
                    }}
                  >
                    Delete
                  </button>
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
