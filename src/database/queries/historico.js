/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import QueryBuilder from '../index';

const table = 'BASF_TRANSPORTES_HISTORICO';

export default {
  async getAll() {
    const historicos = await QueryBuilder(table);
    return historicos;
  },

  async bulk(historicos = []) {
    if (historicos.length <= 0) {
      return new Error('Body request is invalid!');
    }

    const result = {};
    for (const hist of historicos) {
      const existHistorico = await QueryBuilder(table)
        .select('TRANSPORTE_ID')
        .where('TRANSPORTE_ID', '=', hist.TRANSPORTE_ID)
        .first();
      if (!existHistorico) {
        await QueryBuilder(table).insert(hist, ['*']);
        result[hist.TRANSPORTE_ID] = 'created';
      } else {
        await QueryBuilder(table)
          .where('TRANSPORTE_ID', '=', hist.TRANSPORTE_ID)
          .update(hist);
        result[hist.TRANSPORTE_ID] = 'updated';
      }
    }
    return result;
  },
};
