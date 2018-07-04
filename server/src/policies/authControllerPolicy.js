const Joi = require('joi');

module.exports = {

  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Email no vàlid'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'La contrassenya ha de contenir entre 8 i 32 caràcters'
          })
          break
        default:
          res.status(400).send({
            error: 'Error del servidor'
          })
      }

    } else {
      next();
    }
  },




}
