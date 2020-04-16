class MovimentacaoController {
  index(req, res) {
    return res.json({ ok: true });
  }

  bulk(req, res) {
    return res.json({ ok: true });
  }
}
export default new MovimentacaoController();
