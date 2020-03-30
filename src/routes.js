import { Router } from 'express';

import TransportesController from './app/controllers/TransportesController';
import RemessaControlller from './app/controllers/RemessaControlller';
import RemessaItemsController from './app/controllers/RemessaItemsController';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ ok: 'teste' });
});

routes.get('/transportes', TransportesController.index);
routes.post('/transportes', TransportesController.store);
routes.post('/transportes/bulk', TransportesController.bulk);

routes.get('/remessas', RemessaControlller.index);
routes.post('/remessas', RemessaControlller.store);
routes.post('/remessas/bulk', RemessaControlller.bulk);

routes.get('/remessas/items', RemessaItemsController.index);
routes.post('/remessas/items', RemessaItemsController.store);
routes.post('/remessas/bulk/items', RemessaItemsController.bulk);

export default routes;
