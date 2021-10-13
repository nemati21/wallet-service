const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

['NODE_ENV', 'PORT', 'MONGO_URL', 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_DB_NAME', 'LOG_FILE', 'LOG_LEVEL', 'DISCOUNT_BASE_URL', 'PROXY_URL'].forEach((name) => {
  if (Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV.toLowerCase(),
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    file: path.join(__dirname, '..', (process.env.LOG_FILE || './service.log')),
  },
  services: {
    discount: {
      decrementUrl: `${process.env.DISCOUNT_BASE_URL}/api/v1/discount/decrement/%code%`,
    },
  },
  proxy: process.env.PROXY_URL || null,
  documentation: {
    swagger: {
      info: {
        title: 'Wallet Service Swagger',
        description: 'Wallet Service Documentation',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  },
  server: {
    port: Number(process.env.PORT),
  },
  db: {
    url: process.env.MONGO_URL,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    name: process.env.MONGO_DB_NAME,
  },
};

module.exports = config;
