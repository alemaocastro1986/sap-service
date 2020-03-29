import repository from '../../database/queries/remessas';

class RemessaController {
  async index(req, res) {
    const response = await repository.getAll();
    return res.json(response);
  }

  async store(req, res) {
    const response = await repository.store(req.body);
    return res.json(response);
  }

  async bulk(req, res) {
    const response = await repository.bulk(req.body);
    return res.json(response);
  }
}

export default new RemessaController();
