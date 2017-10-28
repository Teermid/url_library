const Joi = require('joi');

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const {error, value} = Joi.validate(req.body, schema)
    console.log(error);
    console.log(value);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'The email is not valid'
          })
          break;
        case 'password':
          res.status(400).send({
            error: 'Password does not match the policy'
          })
          break;
        default:
          res.status(400).send({
            error: 'Unexpected error'
          })
      }

    } else {
      next();
    }

  }

}