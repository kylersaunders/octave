const express = require('express');
const apiRouter = express.Router();
const apiController = require('../controllers/apiController');

apiRouter.get(
  '/getProfile',
  apiController.checkAuth,
  apiController.getProfile,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getUsersPlaylists',
  apiController.checkAuth,
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
  apiController.checkAuth,
  apiController.getSearch,
  apiController.getFromSpotify,
  (req, res) => {
    // console.log('api search results ', res.locals.body);
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTrack',
  apiController.checkAuth,
  apiController.getTrack,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTracks',
  apiController.checkAuth,
  apiController.getTracks,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/buildWorkout',
  apiController.checkAuth,
  apiController.getRecommendations,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getRecommendations',
  apiController.checkAuth,
  apiController.getRecommendations,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);
apiRouter.get(
  '/getTracksFeatures',
  apiController.checkAuth,
  apiController.getTracksFeatures,
  apiController.getFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

apiRouter.post(
  '/createPlaylist',
  apiController.checkAuth,
  apiController.getProfile,
  apiController.getFromSpotify,
  apiController.getUserId,
  apiController.createPlaylist,
  apiController.postToSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

apiRouter.post(
  '/addItemsToPlaylist',
  apiController.checkAuth,
  apiController.addItemsToPlaylist,
  apiController.postToSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

apiRouter.delete(
  '/deletePlaylist',
  apiController.checkAuth,
  apiController.deletePlaylist,
  apiController.deleteFromSpotify,
  (req, res) => {
    res.json(res.locals.body).send();
  }
);

module.exports = apiRouter;
