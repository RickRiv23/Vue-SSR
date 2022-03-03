const request = require('supertest');
const app = require('..');

describe("The testing framework (Jest)", () => {
  test("can run tests", () => {
    expect(true).toBe(true);
  });
});
