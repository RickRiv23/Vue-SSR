const request = require('supertest');
const app = require('../../');
const Spotify = require('../../middlewares/Spotify');

describe('/api/spotify', () => {
    describe('GET /login', () => {
      test('shoule return 302 response', async () => {
        const response = await request(app).get('/api/spotify/login');
        expect(response.statusCode).toBe(302);
      });
      test('should redirect to Spotify login', async () => {
        const response = await request(app).get('/api/spotify/login');
        console.log(response.headers.location);
        expect(response.headers.location).toMatch(Spotify.getAuthEndpoint);
      });
    })
    describe('GET /callback', () => {
      test('testing callback API', async () => {
        // console.log('Enviroment:', process.env.REDIRECT_URI);
        expect(true).toBe(true);
      })
    })
})
