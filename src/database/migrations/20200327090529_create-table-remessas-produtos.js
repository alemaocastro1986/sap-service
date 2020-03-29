exports.up = (knex) => {
  return knex.schema.createTable('BASF_REMESSA_ITEMS', (table) => {
    table.increments('ID').primary('ID');
    table.bigInteger('MATERIAL_CODIGO');
    table.string('MATERIAL_DESCRICAO', 100);
    table.string('POSICAO_TIPO', 10);
    table.string('POSICAO_ORIGEM', 10);
    table.integer('QUANTIDADE');
    table.integer('ITEM');
    table.string('UNIDADE_MEDIDA', 5);
    table.string('DEPOSITO', 10);
    table.bigInteger('REMESSA_ID');
    table.foreign('REMESSA_ID').references('BASF_REMESSAS.REMESSA_ID');
  });
};

exports.down = (knex) => {
  knex.schema.dropTable('BASF_REMESSAS');
};
