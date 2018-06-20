const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {

  async verifyToken (req, res, next) {
    const authHeader = req.headers['authoritzation']
    if (typeof authHeader == 'undefined') {
      res.send(403)
    } else {
      const bearer = authHeader.split(' ')
      const token = bearer[1]
      const response = await jwt.verify(token, config.authentication.jwtSecret)
      if (response._id) {
        next()
      } else {
        res.send(403)
      }
    }
  },

  jwtSignUser(_id) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign({_id}, config.authentication.jwtSecret,
      {
        expiresIn: ONE_WEEK
      })
  },

  async getUserID (authToken) {
    try {
      const bearer = authToken.split(' ')
      const token = bearer[1]
      return await jwt.verify(token, config.authentication.jwtSecret)
    } catch (e) {
      return await jwt.verify(authToken, config.authentication.jwtSecret)
    }


  }
}
