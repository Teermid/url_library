const authController = require('./controllers/authController')
const authControllerPolicy = require('./policies/authControllerPolicy')
const elementsController = require('./controllers/elementsController')
const categoryController = require('./controllers/categoryController')
const metadataController = require('./controllers/metadataController')
/* const tokenPolicy = require('./policies/tokenPolicy') */

module.exports = (app) => {
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  )

  app.post('/login',
    authController.login
  )

  app.post('/elements',
    /* tokenPolicy.verifyToken, */
    elementsController.addElements
  )

  app.get('/elements',
    /* tokenPolicy.verifyToken, */
    elementsController.getData
  )

  app.get('/elements/:id',
    /* tokenPolicy.verifyToken, */
    elementsController.getElementById
  )

  app.put('/elements/:id',
    /* tokenPolicy.verifyToken, */
    elementsController.editElement
  )

  app.delete('/elements/:id',
    /* tokenPolicy.verifyToken, */
    elementsController.deleteElement
  )

  app.get('/elements/checkCat/:catID',
    /* tokenPolicy.verifyToken, */
    elementsController.checkCategory
  )

  app.post('/unsort',
    /* tokenPolicy.verifyToken, */
    elementsController.unsort
  )

  app.post('/delmult',
    /* tokenPolicy.verifyToken, */
    elementsController.deleteMultiple
  )

  app.post('/addmult/:catId',
    /* tokenPolicy.verifyToken, */
    elementsController.addMultiple
  )

  app.post('/category',
    /* tokenPolicy.verifyToken, */
    categoryController.addCategory
  )

  app.get('/category',
  /*  tokenPolicy.verifyToken, */
    categoryController.getCategories
  )

  app.get('/category/:catID',
  /*  tokenPolicy.verifyToken, */
    categoryController.getCategoryById
  )

  app.get('/root-categories',
  /*  tokenPolicy.verifyToken, */
    categoryController.getRootCategories
  )

  app.get('/child-categories',
  /*  tokenPolicy.verifyToken, */
    categoryController.getChildCategories
  )

  app.put('/category/:id',
  /*  tokenPolicy.verifyToken, */
    categoryController.editCategoryName
  )

  app.put('/category/:id/:dropName',
  /*  tokenPolicy.verifyToken, */
    categoryController.editCategoryHierarchy
  )

  app.delete('/category/:id/:flag',
  /*  tokenPolicy.verifyToken, */
    categoryController.deleteCategory
  )

  app.get('/categoryEmpty/:id',
  /*  tokenPolicy.verifyToken, */
    categoryController.isEmpty
  )

  app.post('/metadata',
  /*  tokenPolicy.verifyToken, */
    metadataController.getMetadataProvisional
  )

}
