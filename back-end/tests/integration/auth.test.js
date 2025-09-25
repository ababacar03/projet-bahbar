const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user'); 
const bcrypt = require('bcrypt');

describe('POST /api/login', () => {
  it('doit retourner un token pour un utilisateur valide', async () => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'secret123';
    const hashed = await bcrypt.hash(password, 10);
    const username = `user_${Date.now()}`;

    await User.create({ email, password: hashed, username });

    const res = await request(app).post('/api/login').send({ email, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
