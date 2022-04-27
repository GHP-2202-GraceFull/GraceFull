const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Category },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

describe.only("Categories Routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/categories/", () => {
    it("GET /api/categories", async () => {
      const res = await request(app).get("/api/categories").expect(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(3);
    });
    it("POST /api/categories", async () => {
      await request(app)
        .post("/api/categories", { name: "new-category" })
        .expect(200);
      const res = await request(app).get("/api/categories");
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(4);
    });
  });
});
