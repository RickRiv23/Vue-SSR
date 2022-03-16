const axios = require('axios');
const spotifyMiddleware = require('../../../middlewares/Spotify');
const OAuth = require('../../../middlewares/Spotify/OAuth');
const SpotifyAPI = require('../../../middlewares/Spotify/api_init');

// jest.mock('axios');

const ElvisArtistToken = '43ZHCT0cAZBISjO8DG9PnE';
const tempAuthToken = 'AQDuQOMJirI3ATCDlm80v5ARylomr0rQRVBN4NG7bCoGnFXV0cOkQtP-X7l9RpWpAICyGzAeFlERVV_JXaF6dj7DhnxUjW7VcYQFsJRN5lD1ci1q4jr0KVh_vUGFgC_dVGITfprwu8Ruhe4orh-nXLmuahd0IyKD8nynmcqK7bV8Wz0ce9zjmC3r-k8u7qoeepBJIo6eIePIsOKimjJFX_lno3puIlSCZIz7CqxHib3vZHAH5F6LHSUBpnVG22ynxSIBcXsDxyAKbvU0Cle1dk7eJi4Q1w9vpxHegVEKOl_nFjHfOQCTBz072nBR_50l2scy60Zzw0fVbOL6HuEI78X-vVmCdbs51wmfiODtV06ldu-jgoMaMJG8jzBb2seAYIWPJGInSVc6aaq0PD-ojNsplGQrUw7V0ggO-9dsxlfhB-b2J7iX_543Cd4vTUSK56VqsSoXzGfz2mBdKl-JWgENS1V18TfXIvFdVLgkKRk2mkUeqSlQnCpZryQKESoxXneFyAkk6WAu&state=%5Bobject%20Object%5D';   //  Manually grabbed from cache in client instance
const tempAccessToken = 'BQDPppfHVmUp1Iog5n8gX_i5H_i3jlX6aqH-xEIlp4Y6mFehccdDKrkmeX1IHgyhaVjcMyjiBgw22EtIBj2wBba8m5ha52p6_zjxgN3bX6jyfaTtx4SMhS7eBrmbz7uM0m4j0r5u3yzASaRVasc-nUuTWMPAHNCJxwvRzdNoMkwpuL1AT7qHDicxpxDC76N7cehSdHkh-Lg';   //  Manually grabbed from cache in client instance

const correctAuthEndpoint = "https://accounts.spotify.com/authorize?response_type=code&scope=user-read-private%20user-read-email%20user-read-playback-state%20user-read-currently-playing%20user-read-recently-played%20user-top-read%20user-read-playback-position%20user-follow-modify%20user-follow-read%20user-library-read%20streaming%20app-remote-control&state=[object Object]";

describe('Testing Spotify middleware functions', () => {
  describe('getAuthEndpoint()', () => {
    test('should match correctAuthEndpoint', async () => {
      const authEndpoint = await spotifyMiddleware.getAuthEndpoint;
      expect(authEndpoint).toBe(correctAuthEndpoint);
    }, 3000);

    test('should return a 200 response on GET', async () => {
      const authEndpoint = await spotifyMiddleware.getAuthEndpoint;
      const authResponse = await axios.get(authEndpoint);
      expect(authResponse.status).toBe(200);
    }, 3000);

    test('should return an auth token', async () => {
      const authEndpoint = await spotifyMiddleware.getAuthEndpoint;
      const authResponse = await axios.get(authEndpoint);
      console.log(authResponse.data);
      expect(authResponse.status).toBe(200);
    }, 3000);
  }),

  describe('getAuthorization(code)', () => {
    test('should return accessToken', async () => {
      // const spotifyAuthResponse = await spotifyMiddleware.getAuthorization(tempAuthToken).then(
      //   (data) => {
      //     console.log('Spotify API: Token received', data);
      //     return data;
      //   },
      //   (err) => {
      //     console.log('Spotify API: Error', err);
      //     return err;
      //   }
      // );
      // expect(spotifyAuthResponse.access_token).toBe(tempAccessToken);
    })
  }),

  describe('fetchAlbums(artistToken)', () => {
    test('should return an array of albums', async () => {
      // Spotify middlerware is dependent on the OAuth token; need to manually pull from browser cache
      spotifyMiddleware.setToken(tempAccessToken);
      const albums = await spotifyMiddleware.fetchAlbums(ElvisArtistToken).then(data => { return data.body });
      console.log('Albums: ', albums);
      expect(albums.items).toBeInstanceOf(Array);
    });
    test('should return 200 response', async () => {
      spotifyMiddleware.setToken(tempAccessToken);
      const response = await spotifyMiddleware.fetchAlbums(ElvisArtistToken);
      expect(response.statusCode).toBe(200);
    });
    test('should return albums in specified range', async () => {
      spotifyMiddleware.setToken(tempAccessToken);
      const config = {
        limit: 3
      };
      const albums = await spotifyMiddleware.fetchAlbums(ElvisArtistToken, config).then(data => { return data.body });
      expect(albums.items.length).toBe(3);
    });
  })
})
