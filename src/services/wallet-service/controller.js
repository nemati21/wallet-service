const service = require('./service');

const create = async (req, res) => {
  const { mobile, balance } = req.body;

  const result = await service.create(mobile, balance);

  res.code(200).send({ id: result });
};

const applyDiscount = async (req, res) => {
  const { mobile, code } = req.body;

  await service.applyDiscount(mobile, code);

  return res.code(204).send('');
};

const balance = async (req, res) => {
  const { mobile } = req.params;

  const account = await service.balance(mobile);

  return res.code(200).send({ balance: account.balance });
};

const query = async (req, res) => {
  const { code } = req.params;

  const discounts = await service.query(code);

  return res.send(discounts);
};

module.exports = {
  create,
  applyDiscount,
  balance,
  query,
};
