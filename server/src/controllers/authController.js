const {User} = require('../models');

module.exports = {
  async register(req, res){
    try {
      const user = await User.create(req.body);
      console.log(`authController user object: ${user.toJSON()}`);
      res.send(user.toJSON());
    } catch (e) {
      res.status(400).send({
        error: 'Error creating the account'
      });
    }
  },

  async login (req, res){
    try {
      const {email, password} = req.body;
      console.log(`req.body => email: ${email}, password: ${password}`);
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      console.log(`user => email: ${user.email}, password: ${user.password}`);
      if (!user) {
        res.status(403).send({
          error: 'Login information is not correct'
        });
      } else if (password !== user.password) {
          console.log('inside password');
          res.status(403).send({
            error: 'Login information is not correct'
          });
      } else {
          const userJson = user.toJSON()
          res.send({
            user:userJson
          });
      }
    } catch (e) {
      res.status(500).send({
        error: 'Server error'
      });
    }
  }
}
