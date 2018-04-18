const mongoose = require('mongoose');
const CategoryModel = require('./Category');
//const ElementModel = require('./Element')

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  owner: {
    type: String
  },

  kind: {
    type: String,
    default: 'child'
  },

  disabled: {
    type: Boolean,
    default: false
  },

  parentCategory: {
    type: String,
    default: null
  },

  nestedCategories: [{
    name: String,
    parentCategory: String,
    active: false
  }]

});

module.exports = mongoose.model('Category', categorySchema);

categorySchema.pre('remove', async function (next) {

  try {

    if (this.kind === 'child') {
      // Eliminem la categoria niada del array
      await this.model('Category').update(
        { 'nestedCategories._id': this._id },
        { $pull: { 'nestedCategories': { _id: this._id } } }
      )

      //Si la categoria root no te nestedCategories la convertim en child
      await this.model('Category').update(
        { 'kind': 'root', 'nestedCategories': [] },
        { $set: { kind: 'child' } }
      )

      //Eliminem la categoria del array de categories dels Elements
      await this.model('Element').update(
        { 'categories._id': this._id },
        { $pull: { 'categories': { _id: this._id } } },
        { multi: true }
      )

    } else {
      await this.model('Category').update(
        { 'parentCategory': this.name },
        { $set: { parentCategory: null } },
        { mult: true }
      )

      await this.model('Element').update(
        {'categories.parentCategory': this.name},
        { $set: {'categories.$.parentCategory': null } }
      )
    }


  } catch (e) {
    next()
  }

  next()

});
