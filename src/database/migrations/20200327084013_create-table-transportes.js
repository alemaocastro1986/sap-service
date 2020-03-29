exports.up = (knex) => {
  return knex.schema.createTable('BASF_TRANSPORTES', (table) => {
    table.bigInteger('TRANSPORTE_ID').primary('TRANSPORTE_ID').unique();
    table.string('TRANSPORTADORA', 150);
    table.string('PLACA', 10);
    table.string('PESO_BRUTO', 12);
    table.string('DATA', 12);
    table.string('HORA', 10);
    table.text('OBSERVACAO');
  });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('BASF_PICKINGS')
    .dropTable('BASF_REMESSAS')
    .dropTable('BASF_TRANSPORTES');
};
