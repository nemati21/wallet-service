class UserAlreadyExistError extends Error {
  constructor(code, message) {
    super('User already exists');
    this.code = 1104;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = UserAlreadyExistError;
