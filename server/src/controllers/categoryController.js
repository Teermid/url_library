const { Category } = require('../models');


module.exports = {
  async getCategories (req, res) {
    try {
      const category = await Category.findAll({
        where: {
          userID: req.query.userID
        }
      })
    res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'});
    }


  },

  async addCategory (req, res) {
    console.log('categoryController -> ' + req.body.name + ' ' + req.body.userID);
    try {
      const category = await Category.create(
        {
          name: req.body.name,
          userID: req.body.userID
        });
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'});
    }

  },

  async getElementById (req, res) {

  },

  async editElement (req, res) {

  },

}
