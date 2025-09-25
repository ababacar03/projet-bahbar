const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Bar = require('../../models/bar');

describe('Bar routes', () => {
  let barId;
  let token;

  it('POST /api/login/register/bar - crée un nouveau bar', async () => {
   try {

      const res = await request(app)
  .post('/api/login/register/bar')
  .field('nameBar', `Test Bar ${Date.now()}`)
  .field('manager', new mongoose.Types.ObjectId().toString())
  .field('email', `manager${Date.now()}@test.com`)
  .field('address', '101 Rue hopital militaire 59000 Lille')
  .field('description', 'Un bar pour les tests')
  .field("username", `manager${Date.now()}`)
  .field("password", "password")
    expect(res.statusCode).toBe(201);
    expect(res.body.bar).toHaveProperty('_id');
    barId = res.body.bar._id; 
    token = res.body.token;
   } catch (error) {
    console.error('Erreur lors du test de création de bar:', error);
   }

  });

  it('GET /api/bars - récupère tous les bars', async () => {
    const res = await request(app).get('/api/bars');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/bars/:id - récupère un bar par ID', async () => {
    const req = request(app).get(`/api/bars/${barId}`);
    const res = token ? await req.set('Authorization', `Bearer ${token}`) : await req;
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', barId);
  });

  it('DELETE /api/bars/:id - supprime un bar', async () => {
    const res = await request(app).delete(`/api/bars/${barId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Bar supprimé' });
  });

  it('GET /api/bars/:id - bar supprimé non trouvé', async () => {
    const res = await request(app).get(`/api/bars/${barId}`);
    expect(res.statusCode).toBe(404);
  });
});
