const { Element } = require('../models');

module.exports = {
  async getElements (req, res) {
    console.log('req.query.search => ' + req.query.search);
    if (req.query.search != null) {
      const search = req.query.search
      try {
        const element = await Element.findAll({
          where: {
            $or: [
              'title', 'category'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
        res.send(element)
      } catch (e) {
        res.status(500).send({error: 'error getting elements by search'});
      }
    } else {
      console.log('inside else req.body');
      try {
        const element = await Element.findAll({
        })
        res.send(element)
      } catch (e) {
        res.status(500).send({error: 'Error fetching elements (elementsController)'});
      }
    }

  },

  async addElements (req, res) {
    console.log(`req.body =>${req.body.title}`);
    try {
      const element = await Element.create(req.body);
      console.log(`element create =>${element}`);
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error adding element (elementsController)'});
    }
  },

  async getElementById (req, res) {
    try {
      const element = await Element.findById(req.params.id)
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'});
    }
  },

  async editElement (req, res) {
    console.log(`editElement req.params => ${req.params.id}`);
    console.log(`editElement req.body.title => ${req.body.title}`);
    try {
      const element = await Element.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      console.log(`element after updated => ${element.title}`);
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'});
    }
  },
}
