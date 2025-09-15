// backend/tests/product.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { generateAccessToken } = require("../utils/generateToken");
const User = require("../models/User");

let adminUser;
let adminToken;

beforeAll(async () => {
  // Create dummy admin user
  adminUser = new User({
    name: "Test Admin",
    email: "admin@test.com",
    password: "hashedpassword", // Password hash irrelevant here
    role: "admin",
  });
  await adminUser.save();

  // Generate token with admin's ID
  adminToken = generateAccessToken(adminUser._id.toString(), "admin");
});

describe("Product API", () => {
  it("should fetch all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
  }, 15000);

  it("should create a product (admin only)", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Test Product", price: 100, category: "Electronics" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("product");
    expect(res.body.product.name).toBe("Test Product");
  }, 15000);
});
