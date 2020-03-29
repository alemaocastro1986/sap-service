const { resolve } = require('path');

module.exports = {
  client: 'mssql',
  connection: {
    host: 'localhost',
    database: 'projects',
    user: 'developer',
    password: 'Developer@123',
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
