const metascraper = require('metascraper')
const got = require('got')

module.exports = {
  async getMetadata (targetUrl) {
    const {body: html, url} = await got(targetUrl)
    return metascraper({html, url})
  }

}
