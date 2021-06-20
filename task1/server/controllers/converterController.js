class ConverterController {
  get(req, res) {
    const currencies = req.body;
    res.send(currencies);
  }

  post(req, res) {
    const calculated = req.body;
    res.json(calculated);
  }
}

module.exports = new ConverterController();
