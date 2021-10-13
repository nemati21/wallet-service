const InternalError = require('./InternalError');
const RejectError = require('./RejectError');
const RequestError = require('./RequestError');
const DiscountNotFoundError = require('./DiscountNotFoundError');
const UserNotFoundError = require('./UserNotFoundError');
const UserAlreadyExistError = require('./UserAlreadyExistError');

module.exports = {
  RejectError,
  InternalError,
  RequestError,
  DiscountNotFoundError,
  UserNotFoundError,
  UserAlreadyExistError,
};
