const Element = require('../../models/Element')
const Category = require('../../models/Category')
const User = require('../../models/User')
const content = require('../../content/index')
const alphabet = [
  {"chunk": "Caracters", "regex":"^[^a-z0-9_]"},
  {"chunk": "0-9", "regex":"^[0-9]"},
  {"chunk": "A-F","regex": "^(a|b|c|d|e|f)"},
  {"chunk": "G-L","regex": "^(g|h|i|j|k|l)"},
  {"chunk": "M-Q","regex": "^(m|n|o|p|q)"},
  {"chunk": "R-V","regex": "^(r|s|t|u|v)"},
  {"chunk": "W-Z","regex": "^(w|x|y|z)"}
]

module.exports = {
  async query_1 (userID, searchValue) {
    console.log('QUERY 1');
    try {
      const elements = await Element.find({
        'owner': userID,
        'title': searchValue
      }).sort({ createdAt: -1 })
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
      }).sort({ createdAt: -1 })
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

      }).sort({ createdAt: -1 })
      return this.finalList(elements)
    } catch (e) {
      return ({error: 'error in query_3'})
    }
  },

  async query_4 (userID, sortBy) {
    console.log('QUERY 4');
    var elements
    var finalList = []

    if (sortBy === 'category') {
      try {
        const categoryList = await Category.find({'owner': userID})
        unsortedElements = await Element.find({'owner': userID,'categories': []}).sort({ createdAt: -1 })
        if (unsortedElements.length !== 0) {
          finalList.push(
            {
              'title': 'Unsorted',
              'elements': unsortedElements
            })
        }
        for (var i = 0; i < categoryList.length; i++) {
          elements = await Element.find({'owner': userID, 'categories.name': categoryList[i].name}).sort({ createdAt: -1 })
          if (elements.length !== 0) {
            finalList.push(
              {
                'title': categoryList[i].name,
                'elements': elements
              })
          }
        }
        return(finalList)
      } catch (e) {
        return({error: 'error geting element by cat (elementsController)'})
      }
    }

    if (sortBy === 'title') {
      try {
        for(i = 0; i < alphabet.length; i++) {
          elements = await Element.find({'owner': userID, 'title': new RegExp(alphabet[i].regex, "i")}).sort({ title: 1 })
          if (elements.length !== 0) {
            finalList.push(
              {
                'title': alphabet[i].chunk,
                'elements': elements
              })
          }
        }
        return(finalList)
      } catch (e) {
        return({error: 'error in query_4'})
      }
    }

    if (sortBy === 'date') {
      console.log('INSIDE DATE');
      var finalList = []
      var monthList = []
      try {
        let { timestamp: firstConnection } = await User.findById(userID)

        let elementsToday = await Element.find(
          {
            'owner': userID,
            'timestamp.date': new Date().setHours(0, 0, 0, 0)
          }).sort({ createdAt: -1 })

        if (elementsToday.length !== 0) {
          finalList.push(
            {
              'title': 'Avui',
              'elements': elementsToday
            })
        }

        let elementsThisMonth = await Element.find(
          {
            'owner': userID,
            'timestamp.date': { $ne: new Date().setHours(0, 0, 0, 0) },
            'timestamp.month': new Date().getMonth()
          }).sort({ createdAt: -1 })

        if (elementsThisMonth.length !== 0) {
          finalList.push(
            {
              'title': 'Aquest mes',
              'elements': elementsThisMonth
            })
        }


        for (var i = new Date().getFullYear(); i >= firstConnection.getFullYear(); i--) {
          for (var j = 11; j >= 0; j--) {
              if (j !== new Date().getMonth()) {
                let elementsPerMonth = await Element.find(
                  {
                    'owner': userID,
                    'timestamp.month': j,
                    'timestamp.year': i,
                  }).sort({ createdAt: -1 })

                if (elementsPerMonth.length !== 0) {
                  monthList.push(
                    {
                      'title': this.getMonthName(j),
                      'elements': elementsPerMonth
                    })

                }
              }
          }
        }

        return(finalList.concat(monthList))
      } catch (e) {
        return({error: 'error in query_4'})
      }
    }
  },

  async query_5 (userID, sortBy) {
    console.log('QUERY 5');
    var elements
    var finalList = []
    var counter = 0

    if (sortBy === 'title') {
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

    if (sortBy === 'date') {
      var finalList = []
      var monthList = []
      try {
        let { timestamp: firstConnection } = await User.findById(userID)

        let elementsToday = await Element.find(
          {
            'owner': userID,
            'categories': [],
            'timestamp.date': new Date().setHours(0, 0, 0, 0)
          }).sort({ createdAt: -1 })

        if (elementsToday.length !== 0) {
          finalList.push({'title': 'Avui', 'elements': elementsToday})
        }

        let elementsThisMonth = await Element.find(
          {
            'owner': userID,
            'categories': [],
            'timestamp.date': { $ne: new Date().setHours(0, 0, 0, 0) },
            'timestamp.month': new Date().getMonth()
          }).sort({ createdAt: -1 })

        if (elementsThisMonth.length !== 0) {
          finalList.push({'title': 'Aquest mes', 'elements': elementsThisMonth})
        }


        for (var i = new Date().getFullYear(); i >= firstConnection.getFullYear(); i--) {
          for (var j = 11; j >= 0; j--) {
              if (j !== new Date().getMonth()) {
                let elementsPerMonth = await Element.find(
                  {
                    'owner': userID,
                    'categories': [],
                    'timestamp.month': j,
                    'timestamp.year': i,
                  }).sort({ createdAt: -1 })

                if (elementsPerMonth.length !== 0) {
                  monthList.push({'title': this.getMonthName(j), 'elements': elementsPerMonth})

                }
              }
          }
        }

        return(finalList.concat(monthList))
      } catch (e) {
        return({error: 'error in query_4'})
      }
    }
  },

  async query_6 (userID, category, sortBy) {
    console.log('QUERY 6');
    var elements
    var finalList = []
    var counter = 0

    if (sortBy === 'title') {
      try {
        for(i = 0; i < alphabet.length; i++) {
          elements = await Element.find({
            'owner': userID,
            'title': new RegExp(alphabet[i].regex, "i"),
            '$or': [{
              'categories.name': category
            }, {
              'categories.parentCategory': category
            }]

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

    if (sortBy === 'date') {
      var finalList = []
      var monthList = []
      try {
        let { timestamp: firstConnection } = await User.findById(userID)

        let elementsToday = await Element.find(
          {
            'owner': userID,
            'timestamp.date': new Date().setHours(0, 0, 0, 0),
            '$or': [{
              'categories.name': category
            }, {
              'categories.parentCategory': category
            }]
          }).sort({ createdAt: -1 })

        if (elementsToday.length !== 0) {
          finalList.push({'title': 'Avui', 'elements': elementsToday})
        }

        let elementsThisMonth = await Element.find(
          {
            'owner': userID,
            'timestamp.date': { $ne: new Date().setHours(0, 0, 0, 0) },
            'timestamp.month': new Date().getMonth(),
            '$or': [{
              'categories.name': category
            }, {
              'categories.parentCategory': category
            }]
          }).sort({ createdAt: -1 })

        if (elementsThisMonth.length !== 0) {
          finalList.push({'title': 'Aquest mes', 'elements': elementsThisMonth})
        }

        for (var i = new Date().getFullYear(); i >= firstConnection.getFullYear(); i--) {
          for (var j = 11; j >= 0; j--) {
              if (j !== new Date().getMonth()) {
                let elementsPerMonth = await Element.find(
                  {
                    'owner': userID,
                    'timestamp.month': j,
                    'timestamp.year': i,
                    '$or': [{
                      'categories.name': category
                    }, {
                      'categories.parentCategory': category
                    }]
                  }).sort({ createdAt: -1 })

                if (elementsPerMonth.length !== 0) {
                  monthList.push({'title': this.getMonthName(j), 'elements': elementsPerMonth})

                }
              }
          }
        }

        return(finalList.concat(monthList))
      } catch (e) {
        return({error: 'error in query_4'})
      }
    }
  },

  // ------------------------------------------
  finalList (elements) {
    return [{'title': 'RESULTS', 'elements': elements}]
  },

  getMonthName (index) {
    switch (index) {
      case 0:
        return 'Gener'
      case 1:
        return 'Febrer'
      case 2:
        return 'Març'
      case 3:
        return 'Abril'
      case 4:
        return 'Maig'
      case 5:
        return 'Juny'
      case 6:
        return 'Juliol'
      case 7:
        return 'Agost'
      case 8:
        return 'Setembre'
      case 9:
        return 'Octubre'
      case 10:
        return 'Novembre'
      case 11:
        return 'Decembre'
    }
  }

}
