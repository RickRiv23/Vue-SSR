const request = require('supertest');
const app = require('../../');
const OS = require('../../services/OpenSea');
const OSPresenter = require('../../middlewares/OS/Presenter');

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
