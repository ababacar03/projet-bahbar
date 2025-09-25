const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("User routes", () => {
  let userId;

 it("POST /api/users - crée un nouvel utilisateur", async () => {
  const email = `user_${Date.now()}@test.com`;
  const password = 'secret123';
  const username = `user_${Date.now()}`;

  const res = await request(app).post('/api/users').send({ email, password, username });

  expect(res.statusCode).toBe(201); // 201 pour création
  expect(res.body).toHaveProperty('_id');
  userId = res.body._id;
});

  it("GET /api/users - récupère tous les utilisateurs", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/users/:id - récupère un utilisateur par ID", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("_id", userId);
  });

  it("PUT /api/users/:id - met à jour un utilisateur", async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: "Alice Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Alice Updated");
  });

  it("DELETE /api/users/:id - supprime un utilisateur", async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Utilisateur supprimé" });
  });

  it("GET /api/users/:id - utilisateur supprimé non trouvé", async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
  });
});