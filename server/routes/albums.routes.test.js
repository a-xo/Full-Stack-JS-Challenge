const request = require('supertest')
const app = require('../server')

describe("Get all albums", () => {
    it("should get all albums", async () => {
      await request(app)
        .get("/albums")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });