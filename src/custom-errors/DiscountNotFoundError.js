class UserNotFoundError extends Error {
  constructor(code, message) {
    super('Discount not found');
    this.code = 1103;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = UserNotFoundError;
