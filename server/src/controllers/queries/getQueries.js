const { Element } = require('../../models');
const db = require('../../models/index');
const Op = db.Op;

module.exports = {

  async query_1 (userID, searchValue, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          title: {
              [Op.like]: `%${searchValue}%`
            }
          },
          order: [
            [sortBy, order]
          ]
        })
      return element
    } catch (e) {
      return({error:'error in query_1'})
    }
  },

  async query_2 (userID, searchValue, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: null,
          title: {
            [Op.like]: `%${searchValue}%`
          }
        },
        order: [
          [sortBy, order]
        ]
      })
      return element
    } catch (e) {
      return({error:'error in query_2'})
    }
  },

  async query_3 (userID, category, searchValue, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: category,
          title: {
            [Op.like]: `%${searchValue}%`
          }
        },
        order: [
          [sortBy, order]
        ]
      })
      return element
    } catch (e) {
      return({error:'error in query_3'})
    }
  },

  async query_4 (userID, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    console.log(`inside query 4`);
    try {
      const element = await Element.findAll({
        where: {
          userID: userID
        },
        order: [
          [sortBy, order]
        ]
      })
      return element
    } catch (e) {
      return({error:'error in query_4'})
    }
  },

  async query_5 (userID, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: null
        },
        order: [
          [sortBy, order]
        ]
      })
      return element
    } catch (e) {
      return({error:'error in query_5'})
    }
  },

  async query_6 (userID, category, sortBy) {
    let order = 'DESC'
    if (sortBy === 'title') {
      order = 'ASC'
    }

    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: category
        },
        order: [
          [sortBy, order]
        ]
      })
      return element
    } catch (e) {
      return({error:'error in query_6'})
    }
  }
}
