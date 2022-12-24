const express = require('express');
const app = express();
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const Buffer = require('buffer').Buffer;
const path = require('path');
const axios = require('axios');
// const utils = require('./utils/serverUtils');

app.use(cors()).use(cookieParser()).use(express.json());

const db = require('./models/postgresQLmodel');
const cs = require('./clientSecret');
const apiRouter = require('./routes/api');
const port = 3434;

const generateRandomString = function (length) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const client_id = cs.cid; // Your client id
const client_secret = cs.cs; // Your secret
const scope =
  'user-read-private user-modify-private user-read-email user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private';
const stateKey = 'spotify_auth_state';
let redirect_uri;

if (process.env.NODE_ENV === 'production') {
  redirect_uri = `http://localhost:${port}/login`;
} else {
  redirect_uri = 'http://localhost:8080/login';
}

app.get('/login', async function (req, res) {
  const code = req.query.code || null;
  let state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null) {
    state = generateRandomString(16);
    res.cookie(stateKey, state);
    db.query('truncate table tokens');
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  } else if (state !== storedState) {
    res.redirect('/#state_mismatch');
  } else {
    res.clearCookie(stateKey);
    const postRequest = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      data: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const access = await axios(postRequest);
    if (access.status === 200) {
      const query = {
        values: [access.data.access_token, access.data.refresh_token],
        text: 'INSERT INTO tokens (access_token, refresh_token) VALUES ($1,$2) RETURNING *;',
      };
      db.query(query);
      console.log('**********auth success*********');
      res.cookie('auth', access.data.access_token, { maxAge: 3600 });
      // res.status(200).json(access.data.access_token);
      res.redirect('/');
    } else {
      res.redirect('/#invalid_token');
    }
  }
});

app.get('/refresh_token', async function (req, res) {
  const data = await db
    .query('select refresh_token from tokens')
    .then((res) => res);
  const refresh_token = data.rows[0].refresh_token;
  const refreshRequest = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: {
      grant_type: 'refresh_token',
      refresh_token,
    },
  };

  const refresh = await axios(refreshRequest);
  if (refresh.status === 200) {
    const access_token = refresh.data.access_token;

    db.query('truncate table tokens');
    const query = {
      values: [access_token, refresh_token],
      text: 'INSERT INTO tokens (access_token, refresh_token) VALUES ($1,$2) RETURNING *;',
    };

    db.query(query);
    console.log('*******refresh success********');
    res.redirect('/');
  }
});

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log('ERROR: ', err);
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

console.log(`Listening on ${port}`);
app.listen(port);
