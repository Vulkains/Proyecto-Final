const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'proyecto',
  password: '45547',
  port: 5432
});

module.exports = pool;
