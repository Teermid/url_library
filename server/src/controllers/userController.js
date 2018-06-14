const User = require('../models/User')
const content = require('../content/content')

module.exports = {
  async getSettings (req, res) {
    let { settings } = await User.findById(req.params.id)
    res.send(settings)
  },

  async loadSettings (req, res) {
    await User.update(
      {'_id': req.params.id},
      { $set: { 'settings': req.body } }
    )
    res.send('success')
  },

  async getAppContent (req, res) {
    console.log(' ----------------- GET APP CONTENT -----------------');
    let user = await User.findById(req.params.id)
    if (user.settings.language.value === 'catalan') {
      res.send(content.catalan)
    }
  }
}
