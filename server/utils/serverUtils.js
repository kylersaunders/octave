const db = require('../models/postgresQLmodel');
module.exports = {
  db: async (query) => {
    return db.query(query);
  },
  login: () => {
    //do something
  },
};
