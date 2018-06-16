const catalan = require('./catalan')
const User = require('../models/User')

module.exports = {
  async getContent (id) {
    let user = await User.findById(id)
    console.log(user.settings.language.value)
    if (user.settings.language.value === 'catalan') {
      return catalan
    }
  }
}
