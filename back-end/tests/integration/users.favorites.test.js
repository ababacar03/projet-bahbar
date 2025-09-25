// const request = require('supertest');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const app = require('../../app');
// const User = require('../../models/user');
// const Bar = require('../../models/bar');
// const Role = require('../../models/role');
// require('dotenv').config();

// JWT_SECRET = process.env.JWT_SECRET

// let managerUser, regularUser, managerToken, userToken, createdBar;
// let mongoServer;

// beforeAll(async () => {
//   // Utilisation de MongoDB en mémoire
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri);

//   // Rôles
//   const managerRole = await Role.create({ name: 'manager' });
//   const userRole = await Role.create({ name: 'user' });

//   // Utilisateur manager mock
//   managerUser = await User.create({
//     username: 'manager',
//     email: 'manager4@test.com',
//     password: 'password',
//     role: managerRole._id,
//   });

//   managerToken = jwt.sign({id: managerUser._id }, JWT_SECRET);

//   // Création d’un bar via le manager
//   createdBar = await Bar.create({
//     name: 'Test Bar',
//     manager: managerUser._id,
//     address: '123 Rue Test',
//     image: 'test.jpg',
//     longitude: 2.3522,
//     latitude: 48.8566,
//     description: 'Un bar pour les tests',
//   });

//   // Utilisateur régulier mock
//   regularUser = await User.create({
//     username: 'user',
//     email: 'user@test.com',
//     password: 'password',
//     role: userRole._id,
//     favorites: []
//   });

//   userToken = jwt.sign({id: regularUser._id }, JWT_SECRET);
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// });

// const BASE = '/api/users/favorites';

// test('✅ Ajouter un bar aux favoris avec succès', async () => {
//   const res = await request(app)
//     .post(`${BASE}/${createdBar._id}`)
//     .set('Authorization', `Bearer ${userToken}`);
  
//   console.log('   Status attendu: 200 | Reçu:', res.statusCode);
//   console.log('   Message:', res.body.message);
//   expect(res.statusCode).toBe(200);
//   expect(res.body.message).toBe('Bar ajouté aux favoris.');
// });

// test('⚠️ Ne pas ajouter deux fois le même bar aux favoris', async () => {
//   const res = await request(app)
//     .post(`${BASE}/${createdBar._id}`)
//     .set('Authorization', `Bearer ${userToken}`);
//   console.log('   Status attendu: 400 | Reçu:', res.statusCode);
//   console.log('   Message:', res.body.message);
//   expect(res.statusCode).toBe(400);
//   expect(res.body.message).toBe('Ce bar est déjà en favori.');
// });

// test('✅ Récupérer la liste des favoris', async () => {
//   const res = await request(app)
//     .get(`${BASE}`)
//     .set('Authorization', `Bearer ${userToken}`);

//   console.log('   Status attendu: 200 | Reçu:', res.statusCode);
//   console.log('   Nombre de favoris:', res.body.favorites.length);
//   expect(res.statusCode).toBe(200);
//   expect(res.body.favorites).toHaveLength(1);
//   expect(res.body.favorites[0].name).toBe('Test Bar');
// });

// test('✅ Supprimer un bar des favoris avec succès', async () => {
//   const res = await request(app)
//     .delete(`${BASE}/${createdBar._id}`)
//     .set('Authorization', `Bearer ${userToken}`);

//   console.log('   Status attendu: 200 | Reçu:', res.statusCode);
//   console.log('   Message:', res.body.message);
//   expect(res.statusCode).toBe(200);
//   expect(res.body.message).toBe('Bar retiré des favoris.');
// });

// test('⚠️ Supprimer un bar non présent dans les favoris', async () => {
//   const res = await request(app)
//     .delete(`${BASE}/${createdBar._id}`)
//     .set('Authorization', `Bearer ${userToken}`);

//   console.log('   Status attendu: 200 | Reçu:', res.statusCode);
//   console.log('   Message:', res.body.message);
//   expect(res.statusCode).toBe(200);
//   expect(res.body.message).toBe('Bar retiré des favoris.');
// });
