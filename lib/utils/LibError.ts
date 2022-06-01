export default class LibError extends Error {
  constructor(message: string) {
    super();
    this.message = `[react-headless-timeline]: ${message}`;
  }
}
