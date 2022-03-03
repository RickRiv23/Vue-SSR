
const Spotify = require('../middlewares/Spotify');
const querystring = require('query-string');

module.exports = {
  login: async (req, res) => {
    console.log('Spotify API: routing to Spotify login...');
      res.writeHead(302, {
        'Location': Spotify.getAuthEndpoint
      });
      res.send();
  },
  callback: async (req, res) => {
    console.log('Spotify API: routing to Spotify callback...');

    const { code, state } = req.query || null;

    if(state === null || code === null) {
      res.redirect(process.env.HOME_URI +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
    } else {
      console.log('Spotify API: Running callback...');
      const spotifyAuthResponse = await Spotify.getAuthorization(code).then(
        (data) => {
          console.log('Spotify API: Token received');
          return data;
        },
        (err) => {
          console.log('Spotify API: Error', err);
          return err;
        }
      );
      console.log('Spotify API: callback complete...');
      if(spotifyAuthResponse) {
        res.redirect(process.env.HOME_URI + '?' +
                querystring.stringify({
                    success: 'true',
                    ...spotifyAuthResponse
                }));
      } else {
        res.redirect(process.env.HOME_URI +
                querystring.stringify({
                    error: 'invalid_token'
                }));
      }
    }
  }
};
