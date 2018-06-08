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

  async getCategoryById (req, res) {
    console.log('HITTED -> ' + req.params.catID);
    try {
      res.send(await Category.findById(req.params.catID))
    } catch (e) {
      res.status(500).send({error: 'error getting categories by id'})
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
      const alreadyExists = await Category.find({'name': req.body.name})
      if (alreadyExists.length === 0) {
        const category = new Category(req.body)
        category.parentCategory = (req.body.parentCategory === '') ? null : req.body.parentCategory
        await Category.update(
          {
            'name': req.body.parentCategory
          },
          {
            'kind': 'root',
            'disabled': true,
            $push: {
              nestedCategories: category
            }
          }
        )
        res.send(await category.save())
      } else {
        res.status(500).send({error: 'category already exists'})
      }

    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'})
    }
  },


  async editCategory (req, res) {
    console.log('EDIT HITTED');
    try {
      const categoryBeforeEdit = await Category.findById({'_id': req.params.id})

      const response = await Category.update(
        {'_id': req.params.id},
        { $set: { 'name': req.body.name } }
      )

      if (response.nModified !== 0) {
        console.log('AKI AS DANTRAR')
        console.log(categoryBeforeEdit.name)
        console.log(req.body.name)

        //Categoria a modificar -> root
        //actualitzem el nom del camp parentCategory de les child
        const query1 = await Category.update(
          {'parentCategory': categoryBeforeEdit.name},
          { $set: { 'parentCategory': req.body.name} }
        )

        //Categoria a modificar -> root
        //Actualitzem la referencia 'parentCategory' de l'array de cat nidades
        const query2 = await Category.update (
          { '_id': req.params.id  },
          { $set: { 'nestedCategories.$.parentCategory': req.body.name} },
          { multi: true }
        )

        //Categoria a modificar -> child
        //Actualitzem la referencia 'nom' de l'array de cat nidades
        const query3 = await Category.update(
          { 'nestedCategories._id': req.params.id },
          {
            $set: {
            'nestedCategories.$.name': req.body.name,
           }
         }
        )

        await Element.update(
          {'categories._id': req.params.id},
          { $set: { 'categories.$.name': req.body.name } },
          { multi: true }
        )

      } else {
        console.log('AKI NO AS DANTRAR FILL DE LA GRAN PUTA');
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

        await Category.update(
          {
            'kind': 'root',
            'nestedCategories': { $size: 0 }
          },
          { $set: {'kind': 'child'} }
        )

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

      res.send('CATEGORY EDITED')
    } catch (e) {
      res.send(e.data)
    }
  },

  async deleteCategory (req, res) {
    console.log('FLAG -> ' + req.params.flag);
    try {
      if (req.params.flag === 'true') {
        console.log('INSIDE FLAG IS FUCKING TRUE!!!!!!!!!!!!!!!!!!!!!');
        await Element.remove({'categories._id': req.params.id})
      }
      const toDelete = await Category.findById(req.params.id)
      toDelete.remove()
      res.send('success')
    } catch (e) {
      res.send(e)
    }
  },

  async isEmpty (req, res) {
    try {
      res.send(result = ((await Element.find({'categories._id': req.params.id})).length === 0))
    } catch (e) {
      res.send('error')
    }
  }
}
