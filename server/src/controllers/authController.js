const {User} = require('../models');

module.exports = {
  async register(req, res){
    try {
      const user = await User.create(req.body);
      console.log(user.toJSON());
      res.send(user.toJSON());
    } catch (e) {
      res.status(400).send({
        error: 'Error creating the account'
      });
    }

  }
}
