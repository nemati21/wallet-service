const { db } = require('../../database');

const create = async (id, mobile, balance) => {
  await db.collection('accounts').insertOne({
    id,
    mobile,
    balance,
    // discountCode: account.code || undefined,
    createdts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
    updatedts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
  });

  return true;
};

const find = async (mobile) => {
  let account;

  try {
    account = await db.collection('accounts').findOne({ mobile }, { projection: { _id: 0 } });
  } catch (err) {
    console.log(err);
    account = null;
  }

  return account;
};

const query = async (discountCode) => {
  let account = null;

  try {
    account = await db.collection('accounts').find({ discountCode }).toArray();
  } catch (err) {
    console.log(err);
    account = null;
  }

  return account;
};

const update = async (mobile, account) => {
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString();

  await db.collection('accounts').updateOne({ mobile },
    {
      $set:
      {
        balance: account.balance,
        discountCode: account.code,
        updatedts: now,
      },
    }, { upsert: true });

  return true;
};

module.exports = {
  create,
  find,
  query,
  update,
};
