const catalan = require('./catalan')
const spanish = require('./spanish')
const english = require('./english')
const User = require('../models/User')

module.exports = {
  async getContent (id) {
    let user = await User.findById(id)
    if (user.settings.language.value === 'catalan') {
      return catalan
    }
    if (user.settings.language.value === 'spanish') {
      return spanish
    }
    if (user.settings.language.value === 'english') {
      return english
    }
  }
}
