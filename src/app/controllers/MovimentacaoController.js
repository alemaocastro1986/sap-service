import Repository from '../../database/queries/movitacao';

class MovimentacaoController {
  async index(req, res) {
    const movimentacoes = await Repository.getAll();
    return res.json(movimentacoes);
  }

  async bulk(req, res) {
    const data = req.body;
    const response = await Repository.bulk(data);
    return res.json(response);
  }
}
export default new MovimentacaoController();
