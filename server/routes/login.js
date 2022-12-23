const express = require('express');
const loginRouter = express.Router();
// const apiController = require('../controllers/apiController');

loginRouter.get('/getAccessToken', apiController.getAccessToken, (req, res) => {
  res.json(res.locals.access_token).send();
});

module.exports = loginRouter;
