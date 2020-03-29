const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const knexEnv = require('../../knexfile')[env];

const connection = knex(knexEnv);

module.exports = connection;
