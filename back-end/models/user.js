const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstname: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    default: null
  },
  role: { type: mongoose.Schema.Types.ObjectId, 
          ref: 'Role' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bar'
  }],
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a "User" model in a Node.js application.