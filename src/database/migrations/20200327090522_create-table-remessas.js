exports.up = (knex) => {
  return knex.schema.createTable('BASF_REMESSAS', (table) => {
    table.bigInteger('REMESSA_ID').primary('REMESSA_ID');
    table.bigInteger('TRANSPORTE_ID');
    table.foreign('TRANSPORTE_ID').references('BASF_TRANSPORTES.TRANSPORTE_ID');
  });
};

exports.down = (knex) => {
  knex.schema.dropTable('BASF_REMESSAS');
};
