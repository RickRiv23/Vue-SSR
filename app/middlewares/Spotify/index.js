const spotifyAPI = require('./api_init');
const OAuth = require('./OAuth');

module.exports = {
  getAuthEndpoint: spotifyAPI.createAuthorizeURL(OAuth.getScopes, OAuth.getParams),
  getAuthorization: async (code) => {
    return await spotifyAPI.authorizationCodeGrant(code).then(
      (data) => {
        // console.log('The token expires in ' + data.body['expires_in']);
        // console.log('The access token is ' + data.body['access_token']);
        // console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyAPI.setAccessToken(data.body['access_token']);
        spotifyAPI.setRefreshToken(data.body['refresh_token']);
        return {
          expires_in: data.body['expires_in'],
          access_token: data.body['access_token'],
          refresh_token: data.body['refresh_token']
        }
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
  },
  fetchPlaylists: async (ownerToken) => {},
  fetchPlaylistTracks: async (playlistToken) => {},
  fetchAlbums: async (artistToken) => {
    await spotifyAPI.getArtistAlbums(artistToken).then(
      (data) => {
        console.log('Artist albums', data.body);
        return data.body;
      },
      (err) => {
        console.error(err);
        return err.statusCode;
      }
    );
  },
  fetchAlbumTracks: async (albumToken) => {},
};
