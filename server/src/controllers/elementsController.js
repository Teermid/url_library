const Element = require('../models/Element')
const metascraper = require('metascraper')
const got = require('got')
const queries = require('./queries/getQueries')
var category = null

async function getMetadata (targetUrl) {
  const {body: html, url} = await got(targetUrl)
  return metascraper({html, url})
}

function escapeRegExp (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

module.exports = {
  async getElements (req, res) {
    category = req.query.categoryValue || category
    const searchValue = (req.query.searchValue == null) ? '' : new RegExp(escapeRegExp(req.query.searchValue), 'gi')
    console.log(searchValue)
    const isSearch = req.query.isSearch
    const userID = req.query.userID
    const sortBy = req.query.sortBy || null
    let response = null

    if (isSearch === 'true' && searchValue !== '' && category === 'All') {
      response = await queries.query_1(userID, searchValue, sortBy)
    }
    if (isSearch === 'true' && searchValue !== '' && category === 'Unsorted') {
      response = await queries.query_2(userID, searchValue, sortBy)
    }
    if (isSearch === 'true' && searchValue !== '' && category !== 'All' && category !== 'Unsorted') {
      response = await queries.query_3(userID, category, searchValue, sortBy)
    }
    if (isSearch === 'true' && searchValue === '' && category === 'All') {
      response = await queries.query_4(userID, sortBy)
    }
    if (isSearch === 'true' && searchValue === '' && category === 'Unsorted') {
      response = await queries.query_5(userID, sortBy)
    }
    if (isSearch === 'true' && searchValue === '' && category !== 'All' && category !== 'Unsorted') {
      response = await queries.query_6(userID, category, sortBy)
    }
    if (isSearch === 'false' && category === 'All') {
      response = await queries.query_4(userID, sortBy)
    }
    if (isSearch === 'false' && category === 'Unsorted') {
      response = await queries.query_5(userID, sortBy)
    }
    if (isSearch === 'false' && category !== 'All' && category !== 'Unsorted') {
      response = await queries.query_6(userID, category, sortBy)
    }

    if (response.error) {
      res.status(500).send(response)
    } else {
      res.send(response)
    }
  },

  async addElements (req, res) {
    const { title, description, image, logo } = await getMetadata(req.body.link)

    try {
      const element = new Element(
        {
          title: req.body.title || title,
          link: req.body.link,
          description: req.body.description || description,
          categories: req.body.categories || [],
          imageURL: image,
          iconURL: logo,
          owner: req.body.userID,
          timestamp: new Date()
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
      const elementTemp = await Element.findById(req.params.id)
      var oldDate = elementTemp.timestamp
      await Element.findByIdAndRemove(req.params.id)
      const element = new Element(req.body)
      element.timestamp = oldDate
      await element.save()
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error saving edited element (elementsController)'})
    }
  },

  async deleteElement (req, res) {
    try {
      const response = await Element.findByIdAndRemove(req.params.id)
      res.send(response)
    /*  res.status(200).send({msg: 'Element deleted'}) */
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'})
    }
  },

  async deleteMultiple (req, res) {
    try {
      await Element.remove({'_id': {'$in': req.body}})
    } catch (e) {
      res.send(e)
    }
  }

}
