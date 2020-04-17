exports.up = (knex) => {
  return knex.schema.createTable('BASF_TRANSPORTES_HISTORICO', (table) => {
    table.increments('TRANSPORTE_HISTORICO_ID').primary();
    table.bigInteger('TRANSPORTE_ID').unique();
    table.string('DTAPLANREG', 10);
    table.string('HORPRREG', 8);
    table.string('FIM_ORGAN_', 10);
    table.string('ORGAN_', 8);
    table.string('DTATUALREG', 10);
    table.string('HORAATRG', 8);
    table.string('INPREVCARR', 10);
    table.string('HPINCR', 8);
    table.string('INATCARGA', 10);
    table.string('HATINC', 8);
    table.string('FIMPREVCRG', 10);
    table.string('HPRFCR', 8);
    table.string('FIMATCARRG', 10);
    table.string('HRATFC', 8);
    table.string('DTAPLPRCTR', 10);
    table.string('HOPRVPRT', 8);
    table.string('DTPROCTRNS', 10);
    table.string('HRATPRTR', 8);
    table.string('INÍCPREVTR', 10);
    table.string('HPRINT', 8);
    table.string('INATTRANSP', 10);
    table.string('HREINT', 8);
    table.string('FIMPREVTR_', 10);
    table.string('HRPFTR', 8);
    table.string('FIMATUALTR', 10);
    table.string('HOAFIT', 8);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('BASF_TRANSPORTES_HISTORICO');
};
