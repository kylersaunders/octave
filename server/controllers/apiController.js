const db = require('../models/postgresQLmodel');
const path = require('path');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

var request = require('request'); //deprecated - try to replace
const { query } = require('express');
const apiController = {};

//==================AUTH=========================================================================
apiController.checkAuth = async (req, res, next) => {
  if (req.cookies['auth']) {
    console.log('cookie');
    next();
  } else {
    console.log('no cookie');
    res
      .status(200)
      .sendFile(path.resolve(__dirname, '../../client/login.html'));
  }
};

//==================SUMMARY=========================================================================

apiController.getFromSpotify = async (req, res, next) => {
  try {
    res.locals.response = await fetch(res.locals.url, {
      method: 'get',
      // headers: { Authorization: 'Bearer ' + res.locals.access_token },
      headers: { Authorization: 'Bearer ' + req.cookies['auth'] },
    });
    // console.log('=======server', res.locals.response);
    res.locals.body = await res.locals.response.json();
    // console.log('SERVER====getFromSpotify BODY==', res.locals.body);
    next();
  } catch (err) {
    next(err);
  }
};

apiController.postToSpotify = async (req, res, next) => {
  try {
    res.locals.response = await fetch(res.locals.url, {
      method: 'post',
      headers: { Authorization: 'Bearer ' + res.locals.access_token },
      body: JSON.stringify(res.locals.body),
    });
    res.locals.body = await res.locals.response.json();
    next();
  } catch (err) {
    next(err);
  }
};

apiController.deleteFromSpotify = async (req, res, next) => {
  try {
    res.locals.response = await fetch(res.locals.url, {
      method: 'delete',
      headers: { Authorization: 'Bearer ' + res.locals.access_token },
      body: JSON.stringify(res.locals.body),
    });
    res.locals.body = await res.locals.response.json();
    next();
  } catch (err) {
    next(err);
  }
};

//===================================UNIQUE======GET=======================================================================

apiController.getAccessToken = (req, res, next) => {
  // db.query('select access_token from tokens', (err, data) => {
  //   res.locals.access_token = data.rows[0].access_token;
  //   next();
  // });
  // console.log('cookies', req.cookies);
  return req.cookies
    ? req.cookies['auth']
      ? next()
      : res.redirect('/login')
    : res.redirect('/login');
};

apiController.getUserId = (req, res, next) => {
  res.locals.user_id = res.locals.body.id;
  next();
};

//========================================GET=======================================================================

apiController.getProfile = (req, res, next) => {
  res.locals.url = 'https://api.spotify.com/v1/me';
  next();
};

apiController.getUsersPlaylists = (req, res, next) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const user_id = res.locals.user_id;
  (res.locals.url = `https://api.spotify.com/v1/users/${user_id}/playlists?limit=${limit}&offset=${offset}`),
    next();
};

apiController.getTracks = (req, res, next) => {
  // const playlist_id = '59vCvZskg4LMIAmc2KloIp';
  const playlist_id = req.query.id;
  res.locals.url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  next();
};

apiController.getRecommendations = (req, res, next) => {
  // const query = {
  //   seed_tracks: '0yc37FvbXRwwFaQxzpxbsd,1oj4KLsbYhvfHFnhdb3twP',
  //   min_tempo: '125',
  //   max_tempo: '140',
  //   // min_energy: '.4',
  //   // min_danceability: '.5',
  // };
  // const query = {
  //   seed_tracks: req.query.seed,
  //   min_tempo: req.query.min,
  //   max_tempo: req.query.max,
  // };
  let queryString = '';
  // console.log('REQQUERY', Object.keys(req.query));
  Object.entries(req.query).forEach((x) => {
    queryString += x[0] + '=' + x[1] + '&';
  });
  queryString = queryString.slice(0, queryString.length - 1);
  console.log('===========GET RECS querystring', queryString);

  res.locals.url = `https://api.spotify.com/v1/recommendations?=${queryString}`;
  next();
};

apiController.getTracksFeatures = (req, res, next) => {
  const track_ids = '1oj4KLsbYhvfHFnhdb3twP,11dFghVXANMlKmJXsNCbNl';
  res.locals.url = `https://api.spotify.com/v1/audio-features?ids=${track_ids}`;
  next();
};

apiController.getTrack = (req, res, next) => {
  const track_id = '11dFghVXANMlKmJXsNCbNl';
  res.locals.url = `https://api.spotify.com/v1/tracks/${track_id}`;
  next();
};

apiController.getSearch = (req, res, next) => {
  // res.locals.q = 'sabotage';
  searchTerms = new URLSearchParams(req.query.q).toString();
  // console.log('api QUERY==========', searchTerms);
  const query = {
    q: searchTerms,
    type: 'track',
    include_external: 'audio',
    limit: '5', //20 is default
  };
  let queryString = '';
  Object.keys(query).forEach((x) => {
    queryString += x + '=' + query[x] + '&';
  });
  queryString = queryString.slice(0, queryString.length - 1);
  console.log('SERVER=====getSearch', queryString);
  res.locals.url = `https://api.spotify.com/v1/search?=${queryString}`;
  // console.log('url: ', res.locals.url);
  next();
};

//==================POST==============================================================================

apiController.createPlaylist = (req, res, next) => {
  // console.log('post body', req.body);
  // res.locals.body = {
  //   name: 'ROBOLIST!',
  //   public: false,
  //   collaborative: false,
  // };
  res.locals.body = req.body;
  res.locals.url = `https://api.spotify.com/v1/users/${res.locals.user_id}/playlists`;
  next();
};

apiController.addItemsToPlaylist = (req, res, next) => {
  // res.locals.playlist_id = '1JepoirvmkRebjovPPXSAH';
  res.locals.playlist_id = req.query.list;
  // res.locals.tracksToAdd = [
  //   'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  //   'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  // ];
  res.locals.body = req.body;
  // console.log('server=======', res.locals.playlist_id, res.locals.body);
  // res.locals.body = { uris: res.locals.tracksToAdd };
  res.locals.url = `https://api.spotify.com/v1/playlists/${res.locals.playlist_id}/tracks`;
  next();
};

apiController.getAudioFeatures = (req, res, next) => {
  next();
};

//==================DELETE==============================================================================

// apiController.deleteFromSpotify = (req, res, next) => {
//   request.delete(res.locals.options, function (error, response, body) {
//     res.locals.response = response;
//     next();
//   });
// };

// apiController.removePlaylistItems = (req, res, next) => {
//   const playlist_id = '59vCvZskg4LMIAmc2KloIp';
//   const tracks = { tracks: [{ uri: 'spotify:track:xxx' }] };
//   res.locals.options = {
//     url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
//     headers: { Authorization: 'Bearer ' + res.locals.access_token },
//     json: true,
//   };
//   next();
// };

module.exports = apiController;
