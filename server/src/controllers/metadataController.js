const metascraper = require('metascraper')
const got = require('got')

async function getMetadata (targetUrl) {
  const {body: html, url} = await got(targetUrl)
  return metascraper({html, url})
}

module.exports = {
  async getMetadata (targetUrl) {
    const {body: html, url} = await got(targetUrl)
    return metascraper({html, url})
  },

  async getMetadataProvisional (req, res) {
    console.log('req.body.link ->' +  req.body.link);
    res.send(await getMetadata(req.body.link))
  }

}
