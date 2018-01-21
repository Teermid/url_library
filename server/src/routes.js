const authController = require('./controllers/authController');
const authControllerPolicy = require('./policies/authControllerPolicy');
const elementsController = require('./controllers/elementsController');
const categoryController = require('./controllers/categoryController');

module.exports = (app) => {
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  );

  app.post('/login',
    authController.login
  );

  app.post('/elements',
    elementsController.addElements
  );

  app.get('/elements',
    elementsController.getElements
  );

  app.get('/elements/:id',
    elementsController.getElementById
  );

  app.put('/elements/:id',
    elementsController.editElement
  );

  app.post('/category',
    categoryController.addCategory
  );

  app.get('/category',
    categoryController.getCategories
  );
};
