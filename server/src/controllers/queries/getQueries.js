const Element = require('../../models/Element')
const Category = require('../../models/Category')

module.exports = {
  async query_1 (userID, searchValue) {
    console.log('QUERY 1');
    try {
      const elements = await Element.find({
        'owner': userID,
        'title': searchValue
      })
      return this.finalList(elements)
    } catch (e) {
      return ({error: 'error in query_1'})
    }
  },

  async query_2 (userID, searchValue) {
    console.log('QUERY 2');
    try {
      const elements = await Element.find({
        'owner': userID,
        'categories': [],
        'title': searchValue
      })
      return this.finalList(elements)
    } catch (e) {
      return ({error: 'error in query_2'})
    }
  },

  async query_3 (userID, category, searchValue) {
    console.log('QUERY 3');
    try {
      const elements = await Element.find({
        '$or': [{
          'owner': userID,
          'categories.name': category,
          'title': searchValue
        }, {
          'owner': userID,
          'categories.parentCategory': category,
          'title': searchValue
        }]

      })
      return this.finalList(elements)
    } catch (e) {
      return ({error: 'error in query_3'})
    }
  },

  async query_4 (userID, sortBy) {
    console.log('QUERY 4');
    const alphabet = [{"chunk": "A-F","regex": "^(a|b|c|d|e|f)"},{"chunk": "G-L","regex": "^(g|h|i|j|k|l)"},{"chunk": "M-Q","regex": "^(m|n|o|p|q)"},{"chunk": "R-V","regex": "^(r|s|t|u|v)"},{"chunk": "W-Z","regex": "^(w|x|y|z)"}]
    var elements
    var finalList = []

    if (sortBy === 'category') {
      try {
        const categoryList = await Category.find({'owner': userID})
        unsortedElements = await Element.find({'owner': userID,'categories': []}).sort({ timestamp: -1 })
        if (unsortedElements.length !== 0) {
          finalList.push({'title': 'Unsorted', 'elements': unsortedElements})
        }
        for (var i = 0; i < categoryList.length; i++) {
          elements = await Element.find({'owner': userID, 'categories.name': categoryList[i].name}).sort({ timestamp: -1 })
          if (elements.length !== 0) {
            finalList.push({'title': categoryList[i].name, 'elements': elements})
          }
        }
        return(finalList)
      } catch (e) {
        return({error: 'error geting element by cat (elementsController)'})
      }
    }

    if (sortBy === 'title') {
      console.log('SORT BY TITLE');
      console.log(userID)
      console.log(alphabet[0].regex);
      try {
        for(i = 0; i < alphabet.length; i++) {
          elements = await Element.find({'owner': userID, 'title': new RegExp(alphabet[i].regex, "i")}).sort({ title: 1 })
          if (elements.length !== 0) {
            finalList.push({'title': alphabet[i].chunk, 'elements': elements})
          }
        }
        return(finalList)
      } catch (e) {
        return({error: 'error in query_4'})
      }
    }
  },

  async query_5 (userID, sortBy) {
    console.log('QUERY 5');
    const alphabet = [{"chunk": "A-F","regex": "^(a|b|c|d|e|f)"},{"chunk": "G-L","regex": "^(g|h|i|j|k|l)"},{"chunk": "M-Q","regex": "^(m|n|o|p|q)"},{"chunk": "R-V","regex": "^(r|s|t|u|v)"},{"chunk": "W-Z","regex": "^(w|x|y|z)"}]
    var elements
    var finalList = []
    var counter = 0

    if (sortBy === 'title') {
      console.log('SORT BY TITLE HIT');
      try {
        for(i = 0; i < alphabet.length; i++) {
          elements = await Element.find({
            'owner': userID,
            'categories': [],
            'title': new RegExp(alphabet[i].regex, "i")
          }).sort({ title: 1 })
          if (elements.length !== 0) {
            finalList.push({'title': alphabet[i].chunk, 'elements': elements})
          }
        }
        return(finalList)
      } catch (e) {
        return({error: 'error in query_5'})
      }
    }
  },

  async query_6 (userID, category, sortBy) {
    console.log('QUERY 6');
    const alphabet = [{"chunk": "A-F","regex": "^(a|b|c|d|e|f)"},{"chunk": "G-L","regex": "^(g|h|i|j|k|l)"},{"chunk": "M-Q","regex": "^(m|n|o|p|q)"},{"chunk": "R-V","regex": "^(r|s|t|u|v)"},{"chunk": "W-Z","regex": "^(w|x|y|z)"}]
    var elements
    var finalList = []
    var counter = 0

    if (sortBy === 'title') {
      try {
        for(i = 0; i < alphabet.length; i++) {
          elements = await Element.find({
            '$or': [{
              'owner': userID,
              'categories.name': category
            }, {
              'owner': userID,
              'categories.parentCategory': category
            }],
            'title': new RegExp(alphabet[i].regex, "i")
          }).sort({ title: 1 })
          if (elements.length !== 0) {
            finalList.push({'title': alphabet[i].chunk, 'elements': elements})
          }
        }

        return(finalList)

      } catch (e) {
        return ({error: 'error in query_6'})
      }

    }
  },

  // ------------------------------------------
  async finalList (elements) {
    // console.log('inside finalList -> ' + elements[0].title);
    return [{'title': 'SEARCH', 'elements': elements}]
  }
}
