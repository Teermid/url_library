const authController = require('./controllers/authController');

module.exports = (app) => {
  app.post('/register', authController.register);
};
