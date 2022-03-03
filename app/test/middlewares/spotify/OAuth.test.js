const OAuth = require('../../../middlewares/Spotify/OAuth');
// const { generateRandomString } = require('../../../utils');

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  "user-follow-modify",
  "user-follow-read",
  "user-library-read",
  "streaming",
  "app-remote-control",
];

const params = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: "code",
    scope: scopes,
    show_dialog: true,
};

describe('Testing getters for Spotify OAuth config', () => {
  test('should return scopes', () => {
    expect(OAuth.getScopes).toEqual(scopes);
  });
  test('should return params (minus random string for state)', () => {
    const paramsCopy = OAuth.getParams;
    delete paramsCopy.state;
    expect(paramsCopy).toEqual(params);
  });
});
