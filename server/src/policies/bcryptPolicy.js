const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

module.exports = {
  async getHash (userBeforeHash) {
    const SALT_FACTOR = 8;

    bcrypt.genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(userBeforeHash.password, salt, null))
      .then(hash => {
        userBeforeHash.password = hash
       });

      return userBeforeHash
   },

   async comparePasswords (passwordToCompare, correctPassword) {
     console.log('INSIDE COMPARE PASSWORDS');
     return bcrypt.compareAsync(passwordToCompare, correctPassword) //OJU AL DATU
   }

 }
