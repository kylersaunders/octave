import React, { useState, useEffect } from 'react';
import Recommendations from './Recommendations';
import Playlists from './Playlists';
import PlaylistTracks from './PlaylistTracks';
import { parse } from 'querystring';
import { traceDeprecation } from 'process';

const App = () => {
  const [searchResults, updateSearchResults] = useState([]);
  const [recommendations, updateRecommendations] = useState([]);
  const [playlists, updatePlaylists] = useState([]);
  const [pTracks, updatePTracks] = useState([]);
  const [playlistOffset, incrementPlaylistOffset] = useState(0);

  const playIcon =
    // 'https://toppng.com/uploads/preview/lay-icon-play-icon-11563266312mklxafh8gy.png';
    'https://img.freepik.com/premium-vector/play-button-icon-symbol-transparent-background-video-audio-player-vector-illustration_350225-118.jpg?w=2000';

  let lastClicked;
  let tracksToAdd = {};

  const handleClick = async (e) => {
    if (e.target.className === 'selectPlaylist') {
      lastClicked = e.target.id;
    } else if (e.target.className === 'addRecs') {
      tracksToAdd[e.target.id] = tracksToAdd[e.target.id] ? false : true;
    } else {
      e.preventDefault();
    }
    console.log('click', e.target.id);
    switch (e.target.className) {
      case 'getSearchSubmit':
        let params = new URLSearchParams(
          'q=' + e.target.form[0].value
        ).toString();

        let sResults = await fetch(`/api/search?q=${params}`)
          .then((data) => data.json())
          .then((data) => {
            // console.log('data', data);
            return data.tracks.items;
          });
        // console.log('searchRes', sResults);
        sResults = parseResults(sResults);
        updateSearchResults(() => {
          return sResults;
        });
        return;
      case 'createPlaylist':
        let newPlaylistParams = {
          name: e.target.form[0].value,
          public: false,
          collaborative: false,
        };
        // console.log('new', JSON.stringify(newPlaylistParams));
        let newP = await fetch(`/api/createPlaylist`, {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlaylistParams),
        })
          .then((response) => response.json())
          .then((response) => {
            // console.log('data', response);
            return response;
          });
        e.target.form[0].value = '';
        return;
      case 'generateRecs':
        // console.log(e.target.id);
        const seed = e.target.id;
        // const seed = '0yc37FvbXRwwFaQxzpxbsd';
        let min = document.getElementById('minBPM').value;
        let max = document.getElementById('maxBPM').value;
        min * 1 === 0 ? (min = 80) : '';
        max * 1 === 0 ? (max = 150) : '';

        let data = await fetch(
          `/api/getRecommendations?seed=${seed}&min=${min}&max=${max}`
        )
          .then((data) => data.json())
          .then((data) => {
            return data.tracks;
          });
        data = parseResults(data);
        // console.log('proof ', data);
        updateRecommendations(() => {
          return data;
        });
        return;
      case 'getMyPlaylists':
        const limit = document.getElementById('playlistLimit').value;
        let lists = await fetch(
          `/api/getUsersPlaylists?offset=${playlistOffset}&limit=${limit}`
        )
          .then((data) => data.json())
          .then((data) => {
            // console.log('lists:', data.items);
            return data.items;
          });
        // console.log('yep', lists[0].images[2].url);
        const lists2 = lists.map((x) => {
          const tracks = x.tracks.total;
          const image_url = x.images[2]?.url;
          const public_vis = x.public;
          const id = x.id;
          const name = x.name;
          return { id, name, public_vis, image_url, tracks };
        });
        updatePlaylists(() => {
          return lists2;
        });

        incrementPlaylistOffset((prev) => {
          return prev + 1;
        });
        return;
      case 'getPlaylistTracks':
        const playlist_id = e.target.id;
        let listTracks = await fetch(`/api/getTracks?id=${playlist_id}`)
          .then((data) => data.json())
          .then((data) => {
            return data.items;
          });
        listTracks = listTracks.map((x) => {
          return x.track;
        });
        listTracks = parseResults(listTracks);
        updatePTracks(() => {
          return listTracks;
        });
        return;
      case 'addToPlaylist':
        let newAdds = [];
        for (const [key, value] of Object.entries(tracksToAdd)) {
          // console.log(key, value, tracksToAdd[key]);
          tracksToAdd[key] === true ? newAdds.push(`spotify:track:${key}`) : '';
        }
        // console.log('new', JSON.stringify(newPlaylistParams));
        let newAdditions = await fetch(
          `/api/addItemsToPlaylist?list=${lastClicked}`,
          {
            method: 'post',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uris: newAdds }),
          }
        )
          .then((response) => response.json())
          .then((response) => {
            // console.log('data', response);
            return response;
          });
        // console.log('reqs', newAdds, playlist);
        return;
      case 'addRecs':
        console.log('ID', tracksToAdd, lastClicked);
        return;
      case 'selectPlaylist':
        console.log('ID', tracksToAdd, lastClicked);
        return;
      default:
        console.log('Nothing scheduled for this click');
        return;
    }
  };

  function parseResults(data) {
    const output = [];
    if (data) {
      data.forEach((x) => {
        const { preview_url, id, name, popularity, artists, duration_ms } = x;
        let artists_names = [];
        artists.forEach((y) => {
          const { name } = y;
          artists_names.push(name);
        });
        (artists_names = artists_names.join(', ')),
          output.push({
            preview_url,
            id,
            name,
            popularity,
            artists_names,
            duration_ms,
          });
      });
    }
    // console.log('output', output);
    return output;
  }
  // console.log('recommendations', recommendations);
  return (
    <div>
      <div id='header'>
        <h1>Octave</h1>
        <h4>Because it's a play on music words..</h4>
        <form action='/login'>
          <input type='submit' value='Authorize w/Spotify'></input>
        </form>
        <form action='/refresh_token'>
          <input type='submit' value='Refresh Spotify Auth'></input>
        </form>
      </div>
      <div id='main'>
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
        <div>
          <h2>Recommendations</h2>

          <form>
            <input
              id='addToPlaylist'
              className='addToPlaylist'
              type='submit'
              value='Add checked songs to checked playlist'
              onClick={handleClick}
            ></input>
          </form>
          {/* <button id='getRecommendations' onClick={handleClick}>
            Get recommendations from selected
          </button> */}
          {/* <div style={'display':'flex'}> */}
          <input type='text' id='minBPM' placeholder='minimum BPM'></input>
          <input type='text' id='maxBPM' placeholder='maximum BPM'></input>
          {/* </div> */}
          <Recommendations
            results={recommendations}
            handleClick={handleClick}
            playIcon={playIcon}
          />
        </div>
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
          <Playlists
            results={playlists}
            handleClick={handleClick}
            playIcon={playIcon}
          />
        </div>
        <div>
          <h2>Playlist Tracks</h2>
          <PlaylistTracks
            results={pTracks}
            handleClick={handleClick}
            playIcon={playIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
