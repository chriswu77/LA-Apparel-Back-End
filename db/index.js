const { Pool } = require('pg');
const config = require('../db_config');

const db = new Pool(config);

module.exports = db;
