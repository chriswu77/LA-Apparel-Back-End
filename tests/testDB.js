const { Pool } = require('pg');
const config = require('./test_config');

const db = new Pool(config);

module.exports = db;
