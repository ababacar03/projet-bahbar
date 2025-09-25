const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = `mongodb+srv://alexiscuvillier:${process.env.DATABASE_PASSWORD}${process.env.DATABASE_URL}`;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};
beforeAll(async () => {
    await mongoose.connect(uri, clientOptions);
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB !");
});

afterAll(async () => {
  await mongoose.connection.close();
});