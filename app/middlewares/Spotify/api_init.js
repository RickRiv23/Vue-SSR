const SpotifyWebApi = require('spotify-web-api-node');
const config = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  authEndpoint: process.env.AUTH_ENDPOINT
};

const spotifyAPI = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectUri
});

module.exports = spotifyAPI;
