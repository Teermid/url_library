const authController = require('./controllers/authController');
const authControllerPolicy = require('./policies/authControllerPolicy');

module.exports = (app) => {
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  );

  app.post('/login',
    authController.login
  );
};
