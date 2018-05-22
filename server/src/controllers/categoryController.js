const Category = require('../models/Category')
const Element = require('../models/Element')

module.exports = {

  async getCategories (req, res) {
    try {
      const category = await Category.find({
        'owner': req.query.userID
      }, {__v: 0})
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'})
    }
  },

  async getRootCategories (req, res) {
    try {
      const category = await Category.find({
        $or: [
          {
            'kind': 'root'
          },
          {
            'kind': 'child',
            'parentCategory': null

          }
        ]

      }, {name: 1, _id: 0})
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting root categories'})
    }
  },

  async getChildCategories (req, res) {
    try {
      const category = await Category.find({
        $and: [
          {
            'kind': 'child'
          },
          {
            'parentCategory': { $ne: null }
          }
        ]
      })
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting child categories'})
    }
  },

  async addCategory (req, res) {
    try {
      const category = new Category(req.body)
      const response = await category.save()
      res.send(response)
    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'})
    }
  },

  async editCategory (req, res) {
    // Modificar nom
    try {
      const response = await Category.update(
        {'_id': req.params.id},
        { $set: { 'name': req.body.name } }
      )

      if (response.nModified !== 0) {
        await Category.update(
          { 'nestedCategories._id': req.params.id },
          { $set: { 'nestedCategories.$.name': req.body.name } }
        )

        await Element.update(
          {'categories._id': req.params.id},
          { $set: { 'categories.$.name': req.body.name } },
          { multi: true }

        )
      }

      // Modificat parent
      if (req.body.rootName !== '') {
        await Category.update(
          {'_id': req.params.id},
          { $set: {'parentCategory': req.body.rootName} }
        )

        await Category.update(
          { 'nestedCategories._id': req.params.id },
          { $pull: { 'nestedCategories': { _id: req.params.id } } }
        )

        await Element.update(
          { 'categories._id': req.params.id },
          { $set: { 'categories.$.parentCategory': req.body.rootName } },
          { multi: true }
        )

        // Cercar categories root sense categories niades i passar-les a child
        let response = await Category.update(
          {
            'kind': 'root',
            'nestedCategories': null
          },
          { $set: {'kind': 'child'} }
        )

        console.log(response)

        // --------------------------
        const cat = await Category.findById(req.params.id)

        await Category.update(
          {'name': req.body.rootName},
          {
            $set: { 'kind': 'root' },
            $push: { nestedCategories: cat }
          }

        )
      }
      res.send('success')
    } catch (e) {
      res.send(e.data)
    }
  },

  async deleteCategory (req, res) {
    try {
      const response = await Category.findById(req.params.id)
      response.remove()
      res.send(response)
    } catch (e) {
      res.send(e)
    }
  }
}
