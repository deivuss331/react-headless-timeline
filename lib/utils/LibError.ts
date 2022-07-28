export default class LibError extends Error {
  constructor(message: string) {
    super(message);
    this.name = '[react-headless-timeline]';
  }
}
