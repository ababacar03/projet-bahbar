const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  roleAdmin: {
    type: Boolean,
    default: false
  },
  roleManager: {
    type: Boolean,
    default: true
  },
  roleUser: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Role', roleSchema);
