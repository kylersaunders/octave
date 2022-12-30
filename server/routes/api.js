const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter.get('/getAccessToken', apiController.getAccessToken, (req, res) => {
  res.json(res.locals.access_token).send();
});

apiRouter.get(
  '/getProfile',
  apiController.getAccessToken,
  apiController.getProfile,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getUsersPlaylists',
  apiController.getAccessToken,
  apiController.getProfile,
  apiController.getFromSpotify,
  apiController.getUserId,
  apiController.getUsersPlaylists,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/search',
  apiController.getAccessToken,
  apiController.getSearch,
  apiController.getFromSpotify,
  (req, res) => {
    // console.log('api search results ', res.locals.body);
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTrack',
  apiController.getAccessToken,
  apiController.getTrack,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTracks',
  apiController.getAccessToken,
  apiController.getTracks,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/buildWorkout',
  apiController.getAccessToken,
  apiController.getRecommendations,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getRecommendations',
  apiController.getAccessToken,
  apiController.getRecommendations,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTracksFeatures',
  apiController.getAccessToken,
  apiController.getTracksFeatures,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

apiRouter.post(
  '/createPlaylist',
  apiController.getAccessToken,
  apiController.getProfile,
  apiController.getFromSpotify,
  apiController.getUserId,
  apiController.createPlaylist,
  apiController.postToSpotify,
  (req, res) => {
    // res.json(res.locals.body)
    res.json(res.locals.body).send();
  }
);

apiRouter.post(
  '/addItemsToPlaylist',
  apiController.getAccessToken,
  apiController.addItemsToPlaylist,
  apiController.postToSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

module.exports = apiRouter;
