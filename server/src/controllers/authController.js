const User = require('../models/User')
const tokenPolicy = require('../policies/tokenPolicy')
const bcryptPolicy = require('../policies/bcryptPolicy')

module.exports = {
  async register (req, res) {
    try {
      let alreadyExist = await User.find({'email':req.body.email})
      if (alreadyExist.length > 0) {
        res.status(400).send({error:'El email ja es troba enregistrat'})
      } else {
        const userBeforeHash = new User(req.body)
        const userAfterHash = await bcryptPolicy.getHash(userBeforeHash)
        const userFinal = await userAfterHash.save()
        /* Loging automàtic al registrar-se: */
        res.send({
          user: userFinal,
          token: tokenPolicy.jwtSignUser(userFinal._id)
        })
      }
    } catch (e) {
      res.status(500).send({error: 'Error del servidor'})
    }
  },

  async login (req, res) {
    try {
      // Cerquem un usuari a partir del mail especificat per el client
      const user = await User.findOne({
        'email': req.query.email
      })
      //Usuari no trobat -> Mail incorrecte
      if (!user) {
        res.status(403).send({error: 'Email incorrecte'})
      // Usuari trobat, comparem contrasenyes
      } else if (!(await bcryptPolicy.comparePasswords(req.query.password, user.password))) {
        // Contrasenya incorrecta
        res.status(403).send({error: 'Contrasenya incorrecte'})
      } else {
        // Contrasenya correcte -> generem token i l'enviem conjuntament amb l'usuari
        res.send({
          user: user,
          token: tokenPolicy.jwtSignUser(user._id)
        })
      }
      //Error del servidor
    } catch (e) {
      res.status(500).send({error: 'Server error'})
    }
  },

  async getUserFromToken (req, res) {
    console.log(req.headers['authoritzation'])
    try {
      let _id = await tokenPolicy.getUserID(req.headers['authoritzation'])
      let user = await User.findById(_id)
      res.send(user)
    } catch (e) {
      res.status(403).send({'error': 'Invalid Token'})
    }
  }

}
