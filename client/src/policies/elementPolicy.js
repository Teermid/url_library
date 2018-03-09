const isUrl = require('is-url')

module.exports = {
  isLink (link) {
    return isUrl(link)
  }
}
