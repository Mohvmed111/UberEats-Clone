class Response {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  JSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
class SuccessResponse extends Response {
  constructor(success, message, data) {
    super(success, message, data);
    this.isCustom = true;
  }
}

class AppError extends Response {
  constructor(
    message = "Internal Server Error",
    code = "InternalError",
    field = "UNKNOWN",
    status = 500
  ) {
    super(false, message);
    this.isCustom = true;
    this.field = field;
    this.code = code;
    this.status = status;
  }
  JSON() {
    return {
      success: this.success,
      message: this.message,
      code: this.code,
      field: this.field,
      status: this.status,
    };
  }
}

export { AppError, SuccessResponse };
