const User = require('../models/User')
const tokenPolicy = require('../policies/tokenPolicy')
const bcryptPolicy = require('../policies/bcryptPolicy')

module.exports = {
  async register (req, res) {
    try {
      const userBeforeHash = new User(req.body)
      console.log('User model created -> ' + userBeforeHash)
      const userAfterHash = await bcryptPolicy.getHash(userBeforeHash)
      console.log('user with hash -> ' + userAfterHash)
      userAfterHash.save(function (err) {
        if (err) {
          console.log('error creating user')
          res.send(err)
        }
      })

      const userJson = userAfterHash.toJSON()
      /* Loging automàtic al registrar-se: */
      res.send({
        user: userJson,
        token: tokenPolicy.jwtSignUser(userJson)
      })
    } catch (e) {
      res.status(400).send({error: 'Error creating the account'})
    }
  },

  async login (req, res) {
    console.log(`inside login`)
    try {
      const user = await User.findOne({
        'email': req.body.email
      })

      if (!user) {
        res.status(403).send({error: 'Login information is not correct'})
      } else if (!(await bcryptPolicy.comparePasswords(req.body.password, user.password))) {
        res.status(403).send({error: 'Login information is not correct'})
      } else {
        const userJson = user.toJSON()
        res.send({
          user: userJson,
          token: tokenPolicy.jwtSignUser(userJson)
        })
      }
    } catch (e) {
      res.status(500).send({error: 'Server error'})
    }
  },

  async getUserFromToken (req, res) {
    try {
      let user = await tokenPolicy.getUser(req.params.token)
      res.send(user)
    } catch (e) {
      res.status(403).send({'error': 'Invalid Token'})
    }
  }

}
