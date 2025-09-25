const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  nameBar: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    min: 0,
    max: 5
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  openingHours: {
    type: String,
    trim: true
  },
  manager: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: [String],
    default: []
  }],
});

module.exports = mongoose.model('Bar', barSchema);
// This code defines a Mongoose schema for a "Bar" model in a Node.js application.