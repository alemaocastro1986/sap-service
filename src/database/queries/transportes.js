/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import queryBuilder from '../index';

const table = 'BASF_TRANSPORTES';

export default {
  async getAll() {
    const response = await queryBuilder(table);
    return response;
  },

  async store(newTransporte) {
    const existsTransporte = await queryBuilder
      .from(table)
      .select('TRANSPORTE_ID')
      .where('TRANSPORTE_ID', newTransporte.TRANSPORTE_ID)
      .first();

    if (!existsTransporte) {
      const transporte = await queryBuilder(table).insert(
        {
          newTransporte,
        },
        ['*']
      );
      return transporte;
    }

    const transporte = await queryBuilder(table)
      .where('TRANSPORTE_ID', newTransporte.TRANSPORTE_ID)
      .update({
        DATA: newTransporte.DATA,
        HORA: newTransporte.HORA,
      });
    return transporte;
  },

  async bulk(transportes = []) {
    if (transportes.length <= 0) {
      return new Error('Body request is invalid!');
    }
    const result = {};
    for (const transporte of transportes) {
      const existsTransporte = await queryBuilder
        .from(table)
        .select('TRANSPORTE_ID')
        .where('TRANSPORTE_ID', transporte.TRANSPORTE_ID)
        .first();

      if (!existsTransporte) {
        await queryBuilder(table).insert(transporte, ['*']);
        result[String(transporte.TRANSPORTE_ID)] = 'created';
      }
      if (existsTransporte) {
        const isChanged = await queryBuilder(table)
          .whereRaw('TRANSPORTE_ID = ? AND (DATA <> ? OR HORA <> ?)', [
            transporte.TRANSPORTE_ID,
            transporte.DATA,
            transporte.HORA,
          ])
          .first()
          .update({
            DATA: transporte.DATA,
            HORA: transporte.HORA,
          });

        if (isChanged) {
          result[String(transporte.TRANSPORTE_ID)] = 'updated';
        } else {
          result[String(transporte.TRANSPORTE_ID)] = 'noChanded';
        }
      }
    }
    return result;
  },
};
