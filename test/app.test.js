const request = require('supertest');
const app = require('../app');

describe("The testing framework (Jest)", () => {
  test("can run tests", () => {
    expect(true).toBe(true);
  });
});

describe('/api/opensea', () => {
    test('should return a 200 response', async () => {
        const response = await request(app).get('/api/opensea');
        expect(response.statusCode).toBe(200);
    });
    test ('should return a JSON object', async () => {
        const response = await request(app).get('/api/opensea');
        expect(response.type).toMatch(/json/i);
    });
})

describe('/api/spotify', () => {
    describe('GET /login', () => {
      test.todo('should return 200');
      test.todo('should redirect to Spotify login');
      test.todo('test service layer');
    })
})
