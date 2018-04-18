const Category= require('../models/Category');
const Element= require('../models/Element');

module.exports = {

  async getCategories (req, res) {
    try {
      const category = await Category.find({},{__v:0})
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'});
    }


  },

  async addCategory (req, res) {
    try {
      const category = new Category(req.body)
      console.log('category -> ' + category);
      if (req.body.parentCategory) {
        category.parentCategory = req.body.parentCategory
        const parentCat = await Category.update(
          {
            'name': req.body.parentCategory
          },
          {
            $push: {
              nestedCategories: category
            },
            'kind': 'root',
            'disabled': true
          }
        )
      }

      const response = await category.save()
      res.send(response)
    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'});
    }

  },

  async editCategory (req, res) {
    // Modificar nom
    try {

      const response = await Category.update(
        { '_id': req.params.id},
        { $set: { 'name': req.body.name } }
      )

      if (response.nModified !== 0) {
        await Category.update(
          { 'nestedCategories._id': req.params.id },
          { $set: { 'nestedCategories.$.name': req.body.name } }
        )

        await Element.update(
          { 'categories._id': req.params.id},
          { $set: { 'categories.$.name': req.body.name } },
          { multi: true }

        )
      }

      // Modificat parent

      if (req.body.category !== "") {

        await Category.update(
          { '_id': req.params.id},
          { $set: { 'parentCategory': req.body.category}}
        )

        await Category.update(
          { 'nestedCategories._id': req.params.id },
          { $pull: { 'nestedCategories': { _id: req.params.id } } }
        )

        await Element.update(
          { 'categories._id': req.params.id },
          { $set: { 'categories.$.parentCategory': req.body.category } },
          { multi: true }
        )

      //  await Element.update(
      //    { 'categories._id': req.params.id },
      //    { $pull: { 'categories': { _id: req.params.id } } }
      //  )

        const cat = await Category.findById(req.params.id)

        const response2 = await Category.update(
          { 'name': req.body.category},
          { $push: { nestedCategories: cat }}
        )

      }

      res.send(test)
    } catch (e) {
      res.send(e.data)
    }

  },

  async deleteCategory (req, res) {
    try {
      const response = await Category.findById(req.params.id )
      response.remove()
      res.send(response)
    } catch (e) {
      res.send(e)
    }

  }

}
