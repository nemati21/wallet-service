const walletCtrl = require('../../../services/wallet-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'Wallet Service';

module.exports = (fastify, options, next) => {
  fastify.post('/wallet', {
    schema: {
      description: 'Insert discount code',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['mobile', 'balance'],
        properties: {
          mobile: schemaTypes.msisdn,
          balance: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            id: schemaTypes.uuid,
          },
        },
      },
    },
  }, walletCtrl.create);

  fastify.post('/wallet/discount', {
    schema: {
      description: 'Apply discount code',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['mobile', 'code'],
        properties: {
          mobile: schemaTypes.msisdn,
          // balance: schemaTypes.number,
          code: schemaTypes.string,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        ...schemaTypes.swagger204,
        // 200: {
        //   type: 'object',
        //   properties: {
        //     id: schemaTypes.uuid,
        //   },
        // },
      },
    },
  }, walletCtrl.applyDiscount);

  fastify.get('/wallet/balance/:mobile', {
    schema: {
      description: 'Inquiry wallet balance',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['mobile'],
        properties: {
          mobile: schemaTypes.msisdn,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            balance: schemaTypes.number,
          },
        },
      },
    },
  }, walletCtrl.balance);

  fastify.get('/wallet/accounts/:code', {
    schema: {
      description: 'Report applied discounts',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['code'],
        properties: {
          code: schemaTypes.string,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              mobile: schemaTypes.string,
              balance: schemaTypes.number,
            },
          },
        },
      },
    },
  }, walletCtrl.query);

  next();
};
