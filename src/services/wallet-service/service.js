const uuid = require('uuid');
const request = require('request-promise-native');

const model = require('./model');
const customErrors = require('../../custom-errors');
const config = require('../../config');

const req = request.defaults({ proxy: config.proxy || null, timeout: 60000, time: true });

const decrementDiscount = async (code) => {
  let discount = null;

  try {
    discount = await req.get({
      url: config.services.discount.decrementUrl.replace('%code%', code),
      json: true,
    });
  } catch (err) {
    discount = null;
  }

  return discount;
};

const find = async (mobile) => {
  const account = await model.find(mobile);
  return account;
};

const create = async (mobile, balance) => {
  const id = uuid.v4();

  const account = await find(mobile);
  if (account) throw new customErrors.UserAlreadyExistError();

  await model.create(id, mobile, balance);

  return id;
};

const applyDiscount = async (mobile, code) => {
  const account = await find(mobile);
  if (!account) throw new customErrors.UserNotFoundError();

  const result = await decrementDiscount(code);

  if (result && result.count) {
    account.balance += 1000000;
    account.code = code;

    await model.update(mobile, account);
  }

  return true;
};

const balance = async (mobile) => {
  const account = await find(mobile);
  if (!account) throw new customErrors.UserNotFoundError();

  return account;
};

const query = async (code) => {
  const accounts = await model.query(code);
  return accounts || [];
};

module.exports = {
  find,
  create,
  applyDiscount,
  balance,
  query,
};
