const { Element } = require('../models');
const metascraper = require('metascraper');
const got = require('got')
const db = require('../models/index');
const Op = db.Op;
category = null;

  async function getMetadata(targetUrl) {
    console.log('inside getMetadata')
    const {body: html, url} = await got(targetUrl)
    return await metascraper({html, url})
    //return metadata
    //console.log(`title => ${title}, description =>${description}, logo =>${logo}`);
  };

module.exports = {
  async getElements (req, res) {

    if(req.query.categoryValue !== undefined) {
      category = req.query.categoryValue
    }

    const searchValue = req.query.searchValue
    const isSearch = req.query.isSearch
    const userID = req.query.userID

    if (isSearch === 'true') {
      if (searchValue !== '') {
        if(category == 'All') {
          try {
            const element = await Element.findAll({
              where: {
                userID: userID,
                title: {
                    [Op.like]: `%${searchValue}%`
                  }
                }

            })
            res.send(element)
          } catch (e) {
            res.status(500).send({error: 'error getting elements by search'});
          }

        } else {
          try {
            const element = await Element.findAll({
              where: {
                userID: userID,
                category : category,
                [Op.and]:
                  {
                    title: {
                      [Op.like]: `%${searchValue}$`
                    }
                  }
                //category: category,
                // $or: [
                //   'title', 'category'
                // ].map(key => ({
                //   [key]: {
                //     $like: `%${searchValue}%`
                //   }
                // }))
              }
            })
            res.send(element)
          } catch (e) {
            res.status(500).send({error: 'error getting elements by search'});
          }
        }

      } else {
        if(category == 'All') {
          try {
            const element = await Element.findAll({
              where: {
                userID: userID
              }
            })
            res.send(element)
          } catch (e) {
            res.status(500).send({error: 'Error fetching elements (elementsController)'});
          }

        } else {
          try {
            const element = await Element.findAll({
              where: {
                userID: userID,
                category: category
              }
            })
            res.send(element)
          } catch (e) {
            res.status(500).send({error: 'Error fetching elements (elementsController)'});
          }
        }
      }

    } else {
      if (category === 'All') {
        console.log('Inside category is all');
        try {
          const element = await Element.findAll({
            where: {
              userID: userID
            }
          })
        res.send(element)
        } catch (e) {
          res.status(500).send({error: 'error getting all elements'});
        }

      } else {
        console.log('Inside category is defined');
        try {
          const element = await Element.findAll({
            where: {
              userID: userID,
              category: category
            }
          })
        res.send(element)
        } catch (e) {
          res.status(500).send({error: 'error getting elements by category'});
        }
      }

    }
  },

  async addElements (req, res) {
    console.log(`req.body =>${req.body.link}`)
    const { title, description, image, logo } = await getMetadata(req.body.link)
    try {
      const element = await Element.create(
        {
          title: title,
          link: req.body.link,
          description: description,
          category: req.body.category,
          imageURL: image,
          iconURL: logo,
          userID: req.body.userID
        });

      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error adding element (elementsController)'});
    }
  },

  async getElementById (req, res) {
    try {
      const element = await Element.findById(req.params.id)
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'});
    }
  },

  async editElement (req, res) {
    try {
      const element = await Element.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      res.send(element)
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'});
    }
  },

  async deleteElement (req, res) {
    try {
      await Element.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).send({msg: 'Element deleted'})
    } catch (e) {
      res.status(500).send({error: 'error geting element by id (elementsController)'});
    }
  }

}
