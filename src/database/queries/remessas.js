/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import queryBuilder from '../index';

const table = 'dbo.BASF_REMESSAS';

export default {
  async getAll() {
    const response = await queryBuilder(table);
    return response;
  },

  async store(remessa) {
    const existsRemessa = await queryBuilder
      .from(table)
      .select('REMESSA_ID')
      .where('REMESSA_ID', remessa.REMESSA_ID)
      .where('TRANSPORTE_ID', remessa.TRANSPORTE_ID)
      .first();

    if (!existsRemessa) {
      const newRemessa = await queryBuilder(table).insert(
        {
          remessa,
        },
        ['*']
      );
      return newRemessa;
    }
    return {
      message: 'Remessa already exists!',
    };
  },

  async bulk(remessas = []) {
    if (remessas.length <= 0) {
      return new Error('Body request is invalid!');
    }
    const result = {};
    for (const remessa of remessas) {
      const existsTransporte = await queryBuilder('dbo.BASF_TRANSPORTES')
        .select('TRANSPORTE_ID')
        .where('TRANSPORTE_ID', remessa.TRANSPORTE_ID)
        .first();

      if (existsTransporte) {
        const existsRemessa = await queryBuilder
          .from(table)
          .select('REMESSA_ID')
          .where('REMESSA_ID', remessa.REMESSA_ID)
          .where('TRANSPORTE_ID', existsTransporte.TRANSPORTE_ID)
          .first();

        if (!existsRemessa) {
          await queryBuilder(table).insert(remessa, ['*']);
          result[String(remessa.REMESSA_ID)] = 'created';
        } else {
          result[String(remessa.REMESSA_ID)] = 'Already exists';
        }
      }
    }
    return result;
  },
};
