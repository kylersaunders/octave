const db = require('./models/postgresQLmodel');
module.exports = {
  db: async (query) => {
    db.query(query, (err, data) => {
      console.log('tokens cleaned');
    });
  },
};
