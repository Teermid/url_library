const mongoose = require('mongoose')
/* const CategoryModel = require('./Category') */

let elementSchema = mongoose.Schema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  categories: [{
    name: String,
    owner: String,
    kind: String,
    parentCategory: String,
  }],
  imageURL: {
    type: String
  },
  owner: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  timestamp: {
    date: {
      type: Date,
      default: new Date().setHours(0, 0, 0, 0)
    },
    month: {
      type: Number,
      default: new Date().getMonth()
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    }
  },
  selected: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Element', elementSchema)
