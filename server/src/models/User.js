const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: new Date().setHours(0,0,0,0)
  }
});

module.exports = mongoose.model('User', userSchema)
