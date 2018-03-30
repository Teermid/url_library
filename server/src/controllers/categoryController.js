const Category= require('../models/Category');

module.exports = {
  async getCategories (req, res) {
    console.log('hit getCategories -> ' + req.params.owner);
    try {
      const category = await Category.find({
        'owner': req.query.userID,
        'root': true
      }).exec()
      res.send(category)
    } catch (e) {
      res.status(500).send({error: 'error getting categories'});
    }


  },

  async addCategory (req, res) {
    try {
      const category = new Category(req.body)
      if (req.body.parent) {
        category.root = false
        category.parentCategory = req.body.parent
        const parentCat = await Category.update(
          {
            'name': req.body.parent
          },
          {
            $push: {
              nestedCategories: category
            }
          }
        )
      }

      const response = await category.save()
      console.log(response);

      res.send(response)
    } catch (e) {
      res.status(500).send({error: 'error adding category (elementsController)'});
    }

  }

  // async getElementById (req, res) {
  //
  // },
  //
  // async editElement (req, res) {
  //
  // },

}
