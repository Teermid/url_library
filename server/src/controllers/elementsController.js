const { Element } = require('../models');

module.exports = {
  async getElements (req, res) {
    try {
      const element = await Element.findAll({
      })
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'Error fetching elements (elementsController)'});
    }
  },

  async addElements (req, res) {
    console.log(`req.body =>${req.body}`);
    console.log(`Element model => ${Element}`);
    try {
      const element = await Element.create(req.body);
      console.log(`element create =>${element}`);
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error adding element (elementsController)'});
    }
  }
}
