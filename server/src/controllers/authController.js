const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSingUser (user) {
  console.log('inside jwtSingUser');
  const ONE_WEEK = 60*60*24*7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res){
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());

      /*Loging automàtic al registrar-se:*/
      // res.send({
      //   user: userJson,
      //   token: jwtSingUser(userJson)
      // });
    } catch (e) {
      res.status(400).send({
        error: 'Error creating the account'
      });
    }
  },

  async login (req, res){
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
        res.status(403).send({
          error: 'Login information is not correct'
        });

      } else if (!(await user.comparePassword(password))) {
          res.status(403).send({
            error: 'Login information is not correct'
          });

      } else {
          const userJson = user.toJSON()
          res.send({
            user: userJson,
            token: jwtSingUser(userJson)
          });
      }
    } catch (e) {
      res.status(500).send({
        error: 'Server error'
      });
    }
  }
}
