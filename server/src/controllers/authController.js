const {User} = require('../models');
const tokenPolicy = require('../policies/tokenPolicy')

module.exports = {
  async register(req, res) {
    try {
      console.log('inside REGISTER => ' + req.body.email);
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      /*Loging automàtic al registrar-se:*/
      res.send({
        user: userJson,
        token: tokenPolicy.jwtSignUser(userJson)
      });
    } catch (e) {
      res.status(400).send({error: 'Error creating the account'});
    }
  },

  async login(req, res) {
    console.log(`inside login`);
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      console.log(`user found: ${user}`);

      if (!user) {
        res.status(403).send({error: 'Login information is not correct'});

      } else if (!(await user.comparePassword(password))) {
        res.status(403).send({error: 'Login information is not correct'});

      } else {
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: tokenPolicy.jwtSignUser(userJson)
        });
      }
    } catch (e) {
      res.status(500).send({error: 'Server error'});
    }
  }
}
