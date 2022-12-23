const express = require('express'); // Express web server framework
const app = express();
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const Buffer = require('buffer').Buffer;
const path = require('path');
const axios = require('axios');
const helper = require('./serverHelpers');

app.use(cors()).use(cookieParser()).use(express.json());

const db = require('./models/postgresQLmodel');
const cs = require('./clientSecret');

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
const stateKey = 'spotify_auth_state';
let redirect_uri;

if (process.env.NODE_ENV === 'production') {
  redirect_uri = 'http://localhost:3000/login';
} else {
  redirect_uri = 'http://localhost:8080/login';
}

// app.get('/login', function (req, res) {
//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   var scope =
//     'user-read-private user-modify-private user-read-email user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private';

//   //////===============================
//   db.query('truncate table tokens', (err, data) => {
//     console.log('tokens cleaned');
//   });
//   //////===============================
//   res.redirect(
//     'https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         response_type: 'code',
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state,
//       })
//   );
// });

app.get('/login', function (req, res) {
  console.log('=============callback started');
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null) {
    console.log('yikes');
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope =
      'user-read-private user-modify-private user-read-email user-modify-playback-state playlist-read-collaborative playlist-modify-public playlist-modify-private';
    helper.db('truncate table tokens');
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
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    console.log('==============callback good with good state');
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        // console.log('========body', body);
        const { access_token, refresh_token } = body;
        // console.log(
        //   '==========new tokens========',
        //   access_token,
        //   refresh_token
        // );
        const query = {
          values: [access_token, refresh_token],
          text: 'INSERT INTO tokens (access_token, refresh_token) VALUES ($1,$2) RETURNING *;',
        };

        db.query(query, (err, data) => {
          console.log('tokens stored============', data.rows[0]);
        });
        res.redirect('/');
        // res.send();
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

const apiRouter = require('./routes/api');
const { ModuleFilenameHelpers } = require('webpack');
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log('ERROR: ', err);
});

//=====================================
//extras
app.get('/refresh_token', function async(req, res) {
  // requesting access token from refresh token
  // const refresh_token = req.query.refresh_token;

  db.query('select refresh_token from tokens', (err, data) => {
    const refresh_token = data.rows[0].refresh_token;

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          // new Buffer(client_id + ':' + client_secret).toString('base64'),
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;

        //////===============================
        db.query('truncate table tokens', (err, data) => {
          console.log('tokens cleaned');
        });
        //////===============================
        const query = {
          values: [access_token, refresh_token],
          text: 'INSERT INTO tokens (access_token, refresh_token) VALUES ($1,$2) RETURNING *;',
        };

        db.query(query, (err, data) => {
          // console.log('tokens stored============', data.rows[0]);
        });
        res.redirect('/');

        // res.send({
        //   access_token: access_token,
        // });
      }
    });
  });
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

console.log('Listening on 3000');
app.listen(3000);
