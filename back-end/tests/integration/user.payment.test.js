const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const User = require('../../models/user');
const Role = require('../../models/role');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

let user, userToken, mongoServer;

jest.setTimeout(20000);

beforeAll(async () => {
  // MongoDB mémoire
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Création du rôle user
    const userRole = await Role.create({
    roleAdmin: false,
    roleManager: false,
    roleUser: true
    });
  // Création user
  user = await User.create({
    username: 'user_payment',
    email: 'payment@test.com',
    password: 'payment',
    role: userRole._id
  });

  // Génération du token
  userToken = jwt.sign({ id: user._id }, JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('🌟 Test paiement Stripe', () => {
  test('✅ Créer une session Stripe Checkout', async () => {
    const res = await request(app)
      .post('/api/payment')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 10.2,
        barId: '1234dfgytt67hj',
        barName: 'Bar pour test payement Stripe'
      });

    // Tu peux logger l’URL reçue pour vérifier visuellement
    console.log('Stripe session URL:', res.body.url);

    
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    });

  test('❌ Montant trop faible', async () => {
    const res = await request(app)
      .post('/api/payment')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        amount: 0.2,
        barId: 'fakebarid123',
        barName: 'Bar pour Test Stripe'
      });

        console.log('Montant trop faible | Status:', res.statusCode, '| Message:', res.body.error);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Montant minimum : 0,50€");
  });
});
