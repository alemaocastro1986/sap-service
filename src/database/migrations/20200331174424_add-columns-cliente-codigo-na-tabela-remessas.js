exports.up = function (knex) {
  return knex.schema.table('BASF_REMESSAS', (table) => {
    table.bigInteger('CLIENTE_CODIGO');
    table.string('CLIENTE_DESCRICAO', 180);
  });
};

exports.down = function (knex) {
  return knex.schema.table('BASF_REMESSAS', (table) => {
    table.dropColumn('CLIENTE_CODIGO');
    table.dropColumn('CLIENTE_DESCRICAO');
  });
};
