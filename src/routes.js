import { Router } from 'express';

import TransportesController from './app/controllers/TransportesController';
import RemessaControlller from './app/controllers/RemessaControlller';
import RemessaItemsController from './app/controllers/RemessaItemsController';
import MovimentacaoController from './app/controllers/MovimentacaoController';

const routes = Router();

routes.get('/transportes', TransportesController.index);
routes.post('/transportes', TransportesController.store);
routes.post('/transportes/bulk', TransportesController.bulk);

routes.get('/remessas', RemessaControlller.index);
routes.post('/remessas', RemessaControlller.store);
routes.post('/remessas/bulk', RemessaControlller.bulk);

routes.get('/remessas/items', RemessaItemsController.index);
routes.post('/remessas/items', RemessaItemsController.store);
routes.post('/remessas/bulk/items', RemessaItemsController.bulk);

routes.get('/movimentacao', MovimentacaoController.index);
routes.post('/movimentacao/bulk', MovimentacaoController.bulk);

export default routes;
