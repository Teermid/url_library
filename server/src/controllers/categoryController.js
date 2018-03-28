const Category= require('../models/Category');

module.exports = {
  async getCategories (req, res) {
    console.log('hit getCategories -> ' + req.params.owner);
    try {
      const category = await Category.find({
        //owner: '5ab91a44c131d622fceb4c1a'
        'owner': req.query.userID
      }).exec()
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'});
    }


  },

  async addCategory (req, res) {
    try {
      const category = new Category(req.body)
      await category.save()
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'});
    }

  },

  // async getElementById (req, res) {
  //
  // },
  //
  // async editElement (req, res) {
  //
  // },

}
