/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import queryBuilder from '../index';

const table = 'BASF_REMESSA_ITEMS';

export default {
  async getAll() {
    const response = await queryBuilder(table);
    return response;
  },

  async store(item) {
    const existsRemessa = await queryBuilder('BASF_REMESSAS')
      .select('REMESSA_ID')
      .where('REMESSA_ID', item.REMESSA_ID)
      .first();

    if (existsRemessa) {
      const existsItem = await queryBuilder
        .from(table)
        .select('ID')
        .where('REMESSA_ID', item.REMESSA_ID)
        .where('ITEM', item.ITEM)
        .where('MATERIAL_CODIGO', item.MATERIAL_CODIGO)
        .where('POSICAO_ORIGEM', item.POSICAO_ORIGEM)
        .first();

      if (!existsItem) {
        const newItem = await queryBuilder(table).insert(item, ['*']);
        return newItem;
      }

      const updatedItem = await queryBuilder(table)
        .where('REMESSA_ID', item.REMESSA_ID)
        .where('ITEM', item.ITEM)
        .where('MATERIAL_CODIGO', item.MATERIAL_CODIGO)
        .where('POSICAO_ORIGEM', item.POSICAO_ORIGEM)
        .update({
          QUANTIDADE: item.QUANTIDADE,
        });
      return updatedItem;
    }
    return {
      message: 'Remessa não encontrada',
    };
  },

  async bulk(items = []) {
    if (items.length <= 0) {
      return new Error('Body request is invalid!');
    }

    const result = {};
    for (const item of items) {
      const existsRemessa = await queryBuilder('BASF_REMESSAS')
        .select('REMESSA_ID')
        .where('REMESSA_ID', item.REMESSA_ID)
        .first();

      if (existsRemessa) {
        const existsItem = await queryBuilder
          .from(table)
          .select('ID', 'QUANTIDADE')
          .where('REMESSA_ID', item.REMESSA_ID)
          .where('ITEM', item.ITEM)
          .where('MATERIAL_CODIGO', item.MATERIAL_CODIGO)
          .where('POSICAO_ORIGEM', item.POSICAO_ORIGEM)
          .first();

        if (!existsItem) {
          await queryBuilder(table).insert(item, ['*']);
          result[String(item.REMESSA_ID)] = 'created';
        } else {
          await queryBuilder(table).where('ID', existsItem.ID).update({
            QUANTIDADE: item.QUANTIDADE,
          });
          result[String(item.REMESSA_ID)] = 'update';
        }
      }
    }
    return result;
  },
};
