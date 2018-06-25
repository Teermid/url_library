const catalan = require('./catalan')
const english = require('./english')
const User = require('../models/User')

module.exports = {
  async getContent (id) {
    let user = await User.findById(id)
    console.log(user);
    if (user.settings.language.value === 'catalan') {
      return catalan
    }
    if (user.settings.language.value === 'english') {
      return english
    }
  }
}
