// back-end/scripts/seedBars.js
const mongoose = require('mongoose');
require('dotenv').config(); // charge les variables d'environnement
const Bar = require('../models/bar'); // adapte le chemin selon ton arborescence

const bars = [
  {
    nameBar: "Le Square",
    latitude: 50.6345623,
    longitude: 3.0609558,
    rate: 4.2,
    description: "Le meilleur moyen de résister à la tentation.",
    image: "https://res.cloudinary.com/dknnlgt1s/image/upload/v1753195363/bars/tfqqsh25i33uiiinaxya.jpg",
    address: "67 Rue de Béthune, Lille",
    phone: "03 20 54 64 51",
    website: "",
    openingHours: "09h00 - 00h00",
    manager: []
  },
  {
    nameBar: "L'Atelier Royal",
    latitude: 50.6393536,
    longitude: 3.0583196,
    rate: 3.7,
    description: "Cocktails tropicaux et ambiance festive en plein centre.",
    image: "https://res.cloudinary.com/dknnlgt1s/image/upload/v1753195207/bars/cp3nblo8zxoovstmsgzx.jpg",
    address: "17 Rue Royale, 59800 Lille",
    phone: "06 07 71 40 53",
    website: "https://www.facebook.com/AtelierRoyalLille/",
    openingHours: "16h00 - 1h00",
    manager: []
  },
  {
    nameBar: "The Hive",
    latitude: 50.6321445,
    longitude: 3.0551237,
    rate: 3.5,
    description: "Ambiance décontractée et boissons artisanales.",
    image: "https://res.cloudinary.com/dknnlgt1s/image/upload/v1753195290/bars/ruu4vpmrus5iagconcku.jpg",
    address: "51 Rue de Puebla, 59900 Lille, France",
    phone: "",
    website: "https://www.facebook.com/TheHiveLille/",
    openingHours: "23h00 - 07h00",
    manager: []
  }
];

async function seed() {
  try {
    const uri = `mongodb+srv://alexiscuvillier:${process.env.DATABASE_PASSWORD}${process.env.DATABASE_URL}`;
    await mongoose.connect(uri, {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });

    await Bar.deleteMany(); // facultatif : supprime tous les anciens
    await Bar.insertMany(bars);
    console.log("✅ Bars ajoutés avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err.message);
    process.exit(1);
  }
}

seed();
