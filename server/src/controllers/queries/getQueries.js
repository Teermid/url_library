const Element = require('../../models/Element')

module.exports = {

  async query_1 (userID, searchValue, sortBy) {
    try {
      const element = await Element.find({
        'owner': userID,
        'title': searchValue
      }).sort(await this.format(sortBy))

      return element
    } catch (e) {
      return ({error: 'error in query_1'})
    }
  },

  async query_2 (userID, searchValue, sortBy) {
    try {
      const element = await Element.find({
        'owner': userID,
        'categories': [],
        'title': searchValue
      }).sort(await this.format(sortBy))
      return element
    } catch (e) {
      return ({error: 'error in query_2'})
    }
  },

  async query_3 (userID, category, searchValue, sortBy) {
    try {
      const element = await Element.find({
        '$or': [{
          'owner': userID,
          'categories.name': category,
          'title': searchValue
        }, {
          'owner': userID,
          'categories.parentCategory': category,
          'title': searchValue
        }]

      }).sort(await this.format(sortBy))
      return element
    } catch (e) {
      return ({error: 'error in query_3'})
    }
  },

  async query_4 (userID, sortBy) {
    try {
      const element = await Element.find({
        'owner': userID
      }).sort(await this.format(sortBy))
      return element
    } catch (e) {
      return ({error: 'error in query_4'})
    }
  },

  async query_5 (userID, sortBy) {
    try {
      const element = await Element.find({
        'owner': userID,
        'categories': []
      }).sort(await this.format(sortBy))
      return element
    } catch (e) {
      return ({error: 'error in query_5'})
    }
  },

  async query_6 (userID, category, sortBy) {
    try {
      const element = await Element.find({
        '$or': [{
          'owner': userID,
          'categories.name': category
        }, {
          'owner': userID,
          'categories.parentCategory': category
        }]
      }).sort(await this.format(sortBy))
      return element
    } catch (e) {
      return ({error: 'error in query_6'})
    }
  },

  // ------------------------------------------
  async format (sortBy) {
    switch (sortBy[0]) {
      case 'timestamp':
        return { 'timestamp': sortBy[1] }
      case 'title':
        return { 'title': sortBy[1] }
    }
  }
}
