const { Pool } = require('pg');
const pg_uri = require('../clientSecret.js');

const PG_URI = pg_uri.pg_uri;
// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

/*
create table if not exists tokens 
(
    _id serial primary key,  
    access_token varchar,
    refresh_token varchar
    )
*/
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed PostgresQL query to ElephantSQL ');
    return pool.query(text, params, callback);
  },
};
