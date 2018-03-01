const { Element } = require('../../models');
const db = require('../../models/index');
const Op = db.Op;

module.exports = {

  async query_1 (userID, searchValue) {
    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          title: {
              [Op.like]: `%${searchValue}%`
            }
          }
        })
      return element
    } catch (e) {
      return({error:'error in query_1'})
    }
  },

  async query_2 (userID, searchValue) {
    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: null,
          title: {
            [Op.like]: `%${searchValue}%`
          }
        }
      })
      return element
    } catch (e) {
      return({error:'error in query_2'})
    }
  },

  async query_3 (userID, category, searchValue) {
    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: category,
          title: {
            [Op.like]: `%${searchValue}%`
          }
        }
      })
      return element
    } catch (e) {
      return({error:'error in query_3'})
    }
  },

  async query_4 (userID) {
    console.log(`inside query 4`);
    try {
      const element = await Element.findAll({
        where: {
          userID: userID
        }
      })
      return element
    } catch (e) {
      return({error:'error in query_4'})
    }
  },

  async query_5 (userID) {
    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: null
        }
      })
      return element
    } catch (e) {
      return({error:'error in query_5'})
    }
  },

  async query_6 (userID, category) {
    try {
      const element = await Element.findAll({
        where: {
          userID: userID,
          category: category
        }
      })
      return element
    } catch (e) {
      return({error:'error in query_6'})
    }
  }
}
