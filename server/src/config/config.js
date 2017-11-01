console.log('inside config.js/authentication');
module.exports = {
  port: process.env.PORT || 8081,

  db: {
    database: process.env.DB_NAME || 'savify_db',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 't2S5uNWHHM$@+@sd',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: process.env.HOST || './savify_db.sqlite'
    }
  },
  
  authentication: {
    jwtSecret: process.env.JWT_SECRET || '8AKwR20E7G6gD5qLAXml'
  }
};
