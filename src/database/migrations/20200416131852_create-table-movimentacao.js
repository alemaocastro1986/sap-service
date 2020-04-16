exports.up = (knex) => {
  return knex.schema.createTable('BASF_MOVIMENTACAO', (table) => {
    table.increments('MOVIMENTACAO_ID').primary('MOVIMENTACAO_ID');
    table.bigInteger('TRANSPORTE_ID').unique();
    table.string('DATA_PROGRAMADA', 12);
    table.string('HORA_PROGRAMADA', 10);
    table.string('TRANSPORTADORA', 150);
    table.string('LINHA_DE_PRODUTOS', 10);
    table.string('TIPO', 12);
    table.string('PESO', 20);
    table.string('LITROS', 20);
    table.string('ITEMS', 20);
    table.string('VOLUMES', 20);
    table.string('LATAS_TOTAL', 20);
    table.string('GALOES_TOTAL', 20);
    table.string('OUTROS_TOTAL', 20);
    table.string('LATAS_EMP_KG', 20);
    table.string('GALOES_EMP_KG', 20);
    table.string('OUTROS_EM_KG', 20);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('BASF_MOVIMENTACAO');
};
