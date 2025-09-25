// database/connect.js
const mongoose = require('mongoose');
const uri = `mongodb+srv://alexiscuvillier:${process.env.DATABASE_PASSWORD}${process.env.DATABASE_URL}`;

const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB !");
  } catch (error) {
    console.error("❌ MongoDB connection failed :", error);
    throw error;
  }
}

module.exports = run;
