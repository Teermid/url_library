
module.exports = {
  port: process.env.PORT || 8081,

  db: {
    name: 'savify_db',
    ip: 'localhost',
    port: '27017'
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET || '8AKwR20E7G6gD5qLAXml'
  }
};
