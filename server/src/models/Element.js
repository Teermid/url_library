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
  categories: [{
    /*type: [CategoryModel.schema]*/
    name:String,
    owner:String,
    kind: String,
    disabled: Boolean,
    parentCategory: String,
    nestedCategories: {
      type: String,
      default: null
    }
  }],
  imageURL: {
    type:String,
  },
  iconURL: {
    type:String,
  },
  owner: {
    type: String
  },
   timestamp: {
     type: Date,
  }
});

module.exports = mongoose.model('Element', elementSchema)
