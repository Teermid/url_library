const Category = require('../models/Category')
const Element = require('../models/Element')
const tokenPolicy = require('../policies/tokenPolicy')

module.exports = {

  async getCategories (req, res) {
    let _id = await tokenPolicy.getUserID(req.headers['authoritzation'])
    try {
      const categories = await Category.find({
       'owner': _id,
        $or: [
          {
            'kind': 'root'
          },
          {
            'kind': 'child',
            'parentCategory': null
          }
        ]
      }, {__v: 0})
      res.send(categories)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'})
    }
  },

  async getCategoryById (req, res) {
    try {
      res.send(await Category.findById(req.params.catID))
    } catch (e) {
      res.status(500).send({error: 'error getting categories by id'})
    }
  },

  async getCustomCategories (req, res) {
    let _id = await tokenPolicy.getUserID(req.headers['authoritzation'])
    try {
      const category = await Category.find({owner: _id}, {nestedCategories: 0, selected:0, hidden:0, __v:0})
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
      const alreadyExists = await Category.find({'name': req.body.name})
      if (alreadyExists.length === 0) {
        //Guardem la catgeoria abans de ser modificada
        const categoryBeforeUpdate = await Category.findById({'_id': req.params.id})
        //Modifiquem el nom de la categoria
        const response = await Category.update(
          {'_id': req.params.id},
          { $set: { 'name': req.body.name } }
        )
        //Si s'ha realitzat alguna modificació respecte el nom anterior...
        if (response.nModified !== 0) {
          //Si la categoria a modificar és root
          if (req.body.kind === 'root') {
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
        res.status(200).send({msg: 'OK'})
      } else {
        res.send({error: 'Name already taken'})
      }
    } catch (e) {
      res.status(403).send({msg: 'Server error'})
    }



  },

  async editCategoryHierarchy (req, res) {
    try {
      // Obtenim les dades de la categoria arrossegada
      const dragId = req.params.id


      // Moficquem el camp parentCategory de la categoria arrossegada
      // Amb el de la categoria a la qual hem arrossegat
      await Category.update(
        {'_id': dragId},
        { $set: {'parentCategory': req.params.dropName} }
      )
      // Eliminem la categoria arrossegada del array de categories
      // niades de la qual en formava part
      await Category.update(
        { 'nestedCategories._id': dragId },
        { $pull: { 'nestedCategories': { _id: dragId } } }
      )
      // Modifiquem el camp parentCategoy del array de categories dels elements
      // que contenen la categoria arrossegada
      await Element.update(
        { 'categories._id': dragId },
        { $set: { 'categories.$.parentCategory': req.params.dropName } },
        { multi: true }
      )
      // Convertim a categories child totes aquelles root les quals
      // l'array de nested categories estigui buit
      await Category.update(
        {
          'kind': 'root',
          'nestedCategories': { $size: 0 }
        },
        { $set: {'kind': 'child'} }
      )

      let updatedDraggedCat = await Category.findById(req.params.id)
      // Afegim la categoria arrossegada al array de categories niades
      // de la categoria a la qual s'ha arrossegat. I la convertim a root
      await Category.update(
        {'name': req.params.dropName},
        {
          $set: { 'kind': 'root' },
          $push: { nestedCategories: updatedDraggedCat }
        }
      )
      res.status(200).send({msg: 'OK'})
    } catch (e) {
      res.status(403).send({msg: 'Server error'})
    }
  },

  async removeNested (req, res) {
    try {

      await Category.update(
        {'_id': req.params.id},
        { $set: { 'parentCategory': null } }
      )

      await Category.update(
        { 'nestedCategories._id': req.params.id },
        { $pull: { 'nestedCategories': { _id: req.params.id } } }
      )

      await Category.update(
        { 'kind': 'root', 'nestedCategories': [] },
        { $set: { kind: 'child' } }
      )

      res.send('success')
    } catch (e) {
      res.status(403).send({error: 'Error removing nested category'})

    } finally {

    }
  },

  async deleteCategory (req, res) {
    try {
      if (req.params.flag === 'true') {
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
