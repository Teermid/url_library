const Element = require('../models/Element')
const Category = require('../models/Category')
const Metadata = require('./metadataController')
const queries = require('./queries/getQueries')
const tokenPolicy = require('../policies/tokenPolicy')
var category = null

function escapeRegExp (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

module.exports = {
  async getData (req, res) {
    console.log('HITED');
    category = req.query.categoryValue || category
    const searchValue = (req.query.searchValue == null || req.query.searchValue == '') ? '' : new RegExp(escapeRegExp(req.query.searchValue), 'gi')
    console.log('searchValue -> ' + searchValue);
    const isSearch = req.query.isSearch
    const userID = req.query.userID
    const sortBy = req.query.sortBy || null
    console.log(sortBy);
    let response = null

    if (isSearch === 'true' && searchValue !== '' && category === 'All') {
      response = await queries.query_1(userID, searchValue)
    }
    if (isSearch === 'true' && searchValue !== '' && category === 'Unsorted') {
      response = await queries.query_2(userID, searchValue)
    }
    if (isSearch === 'true' && searchValue !== '' && category !== 'All' && category !== 'Unsorted') {
      response = await queries.query_3(userID, category, searchValue)
    }
    if (((isSearch === 'true' && searchValue === '') || isSearch === 'false') && category === 'All') {
      response = await queries.query_4(userID, sortBy)
    }
    if (((isSearch === 'true' && searchValue === '') || isSearch === 'false') && category === 'Unsorted') {
      response = await queries.query_5(userID, sortBy)
    }
    if (((isSearch === 'true' && searchValue === '') || isSearch === 'false') && category !== 'All' && category !== 'Unsorted') {
      response = await queries.query_6(userID, category, sortBy)
    }

    if (response.error) {
      res.status(500).send(response)
    } else {
      res.send(response)
    }
  },

  async addElements (req, res) {
    try {
      const { _id } = await tokenPolicy.getUserID(req.headers['authoritzation'])
      const categories = await Category.find( {'_id': {'$in': req.body.categories}})
      console.log('URL =======> ' + req.body.url);
      const element = new Element(
        {
          title: req.body.title,
          url: req.body.url,
          description: req.body.description,
          categories: categories || null,
          imageURL: req.body.image,
          owner: _id
        })

      const response = await element.save()
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  },

  async getElementById (req, res) {
    try {
      const element = await Element.findById(req.params.id)
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'})
    }
  },

  async editElement (req, res) {
    try {
      await Element.update(
        {'_id': (req.params.id)},
        req.body
      )

      res.status(200).send('element updated')
    } catch (e) {
      res.status(500).send({error: 'error saving edited element (elementsController)'})
    }
  },

  async deleteElements (req, res) {
    try {
      const response = await Element.remove({'_id': {'$in': req.body}})
      console.log(response);
      res.send(response)
    } catch (e) {
      res.status(403).send({error: 'error deleting element/s'})
    }
  },

  async getMetadata (req, res) {
    try {
      const response = await Element.find({'url': req.query.url})
      if (response.length > 0) {
        res.send(true)
      } else {
        res.send(await Metadata.getMetadata(req.query.url))
      }
    } catch (e) {
      res.send('error')
    }
  },

  async checkCategory (req, res) {
    try {
      const response = await Element.find({
        'categories._id': req.params.catID
      })
      console.log(response)
      res.send(response)
    /*  res.status(200).send({msg: 'Element deleted'}) */
    } catch (e) {
      res.status(500).send({error: 'error checking for categories (elementsController)'})
    }
  },

  async unsort (req, res) {
    try {
      const count = await Element.update(
        {'_id': {'$in': req.body}},
        { $set: {'categories': []}},
        { multi: true }
      )
      console.log('after unsort ===> ' + count.nModified);
      res.send(count)
    } catch (e) {
      res.status(500).send({error: 'error unsorting element'})
    }
  },

  async addMultiple (req, res) {
    try {
      const category = await Category.findOne({'_id': req.params.catId})
      await Element.update(
        {
          '_id': { $in: req.body },
          'categories.name' : { $ne: category.name }
        },
        { $push: {'categories': category} },
        { multi: true }
      )
      res.send('success')
    } catch (e) {
      res.status(500).send({error: 'error sorting multiple elements to a category'})
    }
  },

  async adminAdd (req, res) {
    try {
      for (var i = 1; i <= 20; i++) {
        const { title, description, image, logo } = await Metadata.getMetadata(req.body.url)
          const element = new Element(
            {
              title: req.body.title || title,
              link: req.body.url,
              description: req.body.description || description,
              categories: req.body.categories || [],
              imageURL: image,
              iconURL: logo,
              owner: req.body.userID
            })
          await element.save()
          console.log('Element ' + i + ' added');
      }
      res.send('SUCCESS')
    } catch (error) {
      res.send('ERROR')
    }
  }

}
