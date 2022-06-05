import LibError from '../LibError';

describe('LibError', () => {
  it('Throws an error', () => {
    const throwError = () => {
      throw new LibError('Test');
    };

    expect(throwError).toThrowError();
  });

  it('Error message contains provided message', () => {
    const msg = 'Error message';
    const error = new LibError(msg);

    expect(error.message.includes(msg)).toBeTruthy();
  });
});
