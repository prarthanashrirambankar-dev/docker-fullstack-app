const request = require("supertest");
const express = require("express");

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    database: "connected"
  });
});

describe("Health Check API", () => {
  test("GET /health should return healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
    expect(response.body.database).toBe("connected");
  });
});