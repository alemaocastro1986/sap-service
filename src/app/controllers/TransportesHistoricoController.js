import Repository from '../../database/queries/historico';

class TransporteHistoricoController {
  async index(req, res) {
    const historicos = await Repository.getAll();
    return res.json(historicos);
  }

  async bulk(req, res) {
    const data = req.body;
    const response = await Repository.bulk(data);
    return res.json(response);
  }
}
export default new TransporteHistoricoController();
