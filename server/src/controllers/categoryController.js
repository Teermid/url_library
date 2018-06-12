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


  async editCategoryName (req, res) {
    try {
      //Guardem la catgeoria abans de ser modificada
      const categoryBeforeUpdate = await Category.findById({'_id': req.params.id})
      console.log('beforeUpdate -> ' + categoryBeforeUpdate.name);

      //Modifiquem el nom de la categoria
      const response = await Category.update(
        {'_id': req.params.id},
        { $set: { 'name': req.body.name } }
      )

      //Si s'ha realitzat alguna modificació respecte el nom anterior...
      if (response.nModified !== 0) {
        //Si la categoria a modificar és root
        if (req.body.kind === 'root') {
          console.log('KIND ROOT')
          //Actualitzem la referencia 'parentCategory' de l'array de cat nidades
          await Category.update(
            { 'nestedCategories.parentCategory': categoryBeforeUpdate.name  },
            { $set: { 'nestedCategories.$.parentCategory': req.body.name} },
            { multi: true }
          )
          //Actualitzem la referencia 'parentCategory' de les child
          await Category.update(
              {'parentCategory': categoryBeforeUpdate.name},
              { $set: { 'parentCategory': req.body.name} },
              { multi: true }
          )
        }

        //Si la categoria a modificar és child amb pare
        if (req.body.kind === 'child' && req.body.parentCategory !== null) {
          console.log('KIND CHILD')
          //modifiquem la referencia 'nom' de l'array de cat nidades
          await Category.update(
            { 'nestedCategories._id': req.params.id },
            {
              $set: {
              'nestedCategories.$.name': req.body.name,
             }
           }
          )
        }

        //Modifiquem la refernecia de la categoria als elements
        await Element.update(
          {'categories._id': req.params.id},
          { $set: { 'categories.$.name': req.body.name } },
          { multi: true }
        )
      }

      res.send('CATEGORY EDITED')
    } catch (e) {
      res.send(e.data)
    }
  },

  async editCategoryHierarchy (req, res) {
    console.log('editCategoryHierarchy');
    console.log(req.params.id);
    console.log(req.params.dropName);

    try {
      await Category.update(
        {'_id': req.params.id},
        { $set: {'parentCategory': req.params.dropName} }
      )

      await Category.update(
        { 'nestedCategories._id': req.params.id },
        { $pull: { 'nestedCategories': { _id: req.params.id } } }
      )

      await Element.update(
        { 'categories._id': req.params.id },
        { $set: { 'categories.$.parentCategory': req.params.dropName } },
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
        {'name': req.params.dropName},
        {
          $set: { 'kind': 'root' },
          $push: { nestedCategories: cat }
        }
      )
      res.send('success')
    } catch (e) {
      res.send('error')
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
