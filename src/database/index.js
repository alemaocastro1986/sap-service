const knex = require('knex');

const knexConfig = require('../config/database');

const connection = knex(knexConfig);

module.exports = connection;
