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
  settings: {
    color: {
      hex: {
        type: String,
        default: '#2c3e50'
      },
      light: {
        type: Boolean,
        default: false
      }
    },
    view: {
      type: String,
      default:'card'
    },
    category: {
      type: String,
      default: 'All'
    },
    sortBy: {
      type: String,
      default: 'date'
    },
    language: {
      value: {
        type: String,
        default: 'catalan'
      },

      text: {
        type: String,
        default: 'Català'
      }
    }
  },
  timestamp: {
    type: Date,
    default: new Date().setHours(0,0,0,0)
  }
});

module.exports = mongoose.model('User', userSchema)
