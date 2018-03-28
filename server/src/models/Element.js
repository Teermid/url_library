const mongoose = require('mongoose');
const CategoryModel = require('./Category')

let elementSchema = mongoose.Schema({
  title: {
    type: String
  },
  link: {
    type:String,
  },
  description: {
    type: String,
  },
  categories: {
    type: [CategoryModel.schema]
  },
  imageURL: {
    type:String,
  },
  iconURL: {
    type:String,
  },
  owner: {
    type: String
  }
});

module.exports = mongoose.model('Element', elementSchema)
