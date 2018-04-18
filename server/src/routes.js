const authController = require('./controllers/authController');
const authControllerPolicy = require('./policies/authControllerPolicy');
const elementsController = require('./controllers/elementsController');
const categoryController = require('./controllers/categoryController');
const tokenPolicy = require('./policies/tokenPolicy');

module.exports = (app) => {
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  );

  app.post('/login',
    authController.login
  );

  app.post('/elements',
    /*tokenPolicy.verifyToken,*/
    elementsController.addElements
  );

  app.get('/elements',
    /*tokenPolicy.verifyToken,*/
    elementsController.getElements
  );

  app.get('/elements/:id',
    /*tokenPolicy.verifyToken,*/
    elementsController.getElementById
  );

  app.put('/elements/:id',
    /*tokenPolicy.verifyToken,*/
    elementsController.editElement
  );

  app.delete('/elements/:id',
    /*tokenPolicy.verifyToken,*/
    elementsController.deleteElement
  );

  app.post('/category',
    /*tokenPolicy.verifyToken,*/
    categoryController.addCategory
  );

  app.get('/category',
  /*  tokenPolicy.verifyToken,*/
    categoryController.getCategories
  );

  app.put('/category/:id',
  /*  tokenPolicy.verifyToken,*/
    categoryController.editCategory
  );

  app.delete('/category/:id',
  /*  tokenPolicy.verifyToken,*/
    categoryController.deleteCategory
  );
};
