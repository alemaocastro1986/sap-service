/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import QueryBuilder from '../index';

const table = 'BASF_MOVIMENTACAO';

export default {
  async getAll() {
    const movimentacoes = await QueryBuilder(table);
    return movimentacoes;
  },

  async bulk(movimentacoes = []) {
    if (movimentacoes.length <= 0) {
      return new Error('Body request is invalid!');
    }

    const result = {};
    for (const mov of movimentacoes) {
      const existMov = await QueryBuilder(table)
        .select('TRANSPORTE_ID')
        .where('TRANSPORTE_ID', '=', mov.TRANSPORTE_ID)
        .first();
      if (!existMov) {
        await QueryBuilder(table).insert(mov, ['*']);
        result[mov.TRANSPORTE_ID] = 'created';
      } else {
        await QueryBuilder(table)
          .where('TRANSPORTE_ID', '=', mov.TRANSPORTE_ID)
          .update(mov);
        result[mov.TRANSPORTE_ID] = 'updated';
      }
    }
    return result;
  },
};
