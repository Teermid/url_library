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
    console.log('------- GET METADATA --------');
    console.log(req.query.url);
    try {
      res.send(await getMetadata(req.query.url))
    } catch (e) {
      res.status(403).send({error: 'error getting metdata'})
    }

  }

}
