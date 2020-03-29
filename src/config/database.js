require('dotenv').config();
const { resolve } = require('path');

module.exports = {
  client: 'mssql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations'),
    tableName: 'KNEX_MIGRATIONS',
  },
};
