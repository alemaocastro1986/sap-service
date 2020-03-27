exports.up = (knex) => {
  knex.hasTable('BASF_TRANSPORTES').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('BASF_TRANSPORTES', (table) => {
        table.integer('TRANSPORTES_ID').primary();
        table.string('TRANSPORTADORA', 150);
        table.string('PLACA', 10);
        table.decimal('PESO_BRUTO', 10, 6);
        table.date('DATA');
        table.time('HORA', { precision: 6 });
        table.text('OBSERVACAO');
      });
    }
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('BASF_TRANSPORTES');
};
