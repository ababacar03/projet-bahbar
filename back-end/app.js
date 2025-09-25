const express = require('express');
require('./config/dotenv');
const passport = require('passport');
require('./config/passport'); // Ensure passport is configured
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('API BahBar');
});
app.use('/images', express.static(path.join(__dirname, 'images')));

// Import routes
const routes = require('./routes');
app.use('/api', routes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Quelque chose s’est mal passé' });
});
module.exports = app;
