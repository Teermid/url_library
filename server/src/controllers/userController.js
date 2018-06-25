const User = require('../models/User')
const content = require('../content/index')
const tokenPolicy = require('../policies/tokenPolicy')

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
    console.log('------------------- GET APP CONTENT ------------------');
    const _id = await tokenPolicy.getUserID(req.headers['authoritzation'])
    res.send(await content.getContent(_id))
    }
  }
