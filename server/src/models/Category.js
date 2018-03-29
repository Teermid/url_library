const mongoose = require('mongoose');
const UserModel = require('./User');

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model('Category', categorySchema);
