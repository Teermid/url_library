const mongoose = require('mongoose');
const CategoryModel = require('./Category');

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
  },
  root: {
    type: Boolean,
    default: true
  },
  nestedCategories: {
    type: Array
  },
  parentCategory: {
    type: String
  }

});

module.exports = mongoose.model('Category', categorySchema);

// categorySchema.pre('save', function (next) {
//   if (this.nestedCategories.length === 0) {
//     console.log('PRE-SAVE');
//     this.nestedCategories = null;
//     console.log('LALA -> ' +  this);
//   }
//   next();
// })
