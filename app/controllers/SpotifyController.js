// const OS = require('../services/OpenSea');
const OAuth = require('../middlewares/Spotify/OAuth');
const axios = require('axios');

module.exports = {
  login: async (req, res) => {
    console.log('Spotify API: Checking login status...');
      res.status(200);
      res.redirect(OAuth.fetchLogin());
  }
};
