const mongoose = require('mongoose')
/* const CategoryModel = require('./Category') */

let elementSchema = mongoose.Schema({
  title: {
    type: String
  },
  link: {
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
    nestedCategories: {
      type: String,
      default: null
    },
    selected: Boolean,
    hidden: Boolean,
    disabled: Boolean
  }],
  imageURL: {
    type: String
  },
  iconURL: {
    type: String
  },
  owner: {
    type: String
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  selected: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Element', elementSchema)
