const spotifyMiddleware = require('../../../middlewares/Spotify');
const OAuth = require('../../../middlewares/Spotify/OAuth');

const ElvisArtistToken = '43ZHCT0cAZBISjO8DG9PnE';

describe('Testing Spotify middleware functions', () => {
  describe('getAuthEndpoint()'),
  describe('getAuthorization(code)'),
  describe('fetchAlbums(artistToken)', () => {
    test('should return an array of albums', async () => {
      const albums = await spotifyMiddleware.fetchAlbums(ElvisArtistToken);
      expect(albums).toBeInstanceOf(Array);
    });
    test.todo('should return an array of albums with the correct properties');
    test.todo('should return 200 response');
    test.todo('should return albums in specified range');
  })
})
