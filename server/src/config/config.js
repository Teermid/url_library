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
  }
};
