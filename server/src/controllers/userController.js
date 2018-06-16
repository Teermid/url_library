const User = require('../models/User')
const content = require('../content/index')

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
    res.send(await content.getContent(req.params.id))
    }
  }
