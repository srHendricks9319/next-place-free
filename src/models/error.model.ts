export class MissingKeyError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class InvalidParameterError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class CouldNotFindAddressError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
