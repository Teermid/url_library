const Element = require('../../models/Element');

module.exports = {

  async query_1 (userID, searchValue, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
    try {
      const element = await Element.find({
        'owner': userID,
        'title': searchValue
        })

      return element
    } catch (e) {
      return({error:'error in query_1'})
    }
  },

  async query_2 (userID, searchValue, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
    try {
      const element = await Element.find({
       'owner': userID,
       'categories': [],
       'title': searchValue
      })
      return element
    } catch (e) {
      return({error:'error in query_2'})
    }
  },

  async query_3 (userID, category, searchValue, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
    try {
      const element = await Element.find({
        "$or":[{
          'owner': userID,
          'categories.name': category,
          'title': searchValue
        },{
          'owner': userID,
          'categories.parentCategory': category,
          'title': searchValue
        }]

      })
      return element
    } catch (e) {
      return({error:'error in query_3'})
    }
  },

  async query_4 (userID, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
  console.log('QUERY 4');
    try {
      const element = await Element.find({
        'owner': userID
      })
      return element
    } catch (e) {
      return({error:'error in query_4'})
    }
  },

  async query_5 (userID, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
    try {
      const element = await Element.find({
        'owner': userID,
        'categories': []
      })
      return element
    } catch (e) {
      return({error:'error in query_5'})
    }
  },

  async query_6 (userID, category, sortBy) {
  //let order = (sortBy == 'title') ? 'ASC' : 'DESC'
    try {
      const element = await Element.find({
        "$or":[{
          'owner': userID,
          'categories.name': category,
        },{
          'owner': userID,
          'categories.parentCategory': category,
        }]
      })
      return element
    } catch (e) {
      return({error:'error in query_6'})
    }
  }
}
