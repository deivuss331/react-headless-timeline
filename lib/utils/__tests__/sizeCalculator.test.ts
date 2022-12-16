import { set } from 'date-fns';
import sizeCalculator from '../sizeCalculator';

const startDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const endDate = set(new Date(), { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59
const exampleEvent = {
  startDate: set(new Date(), { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(new Date(), { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

describe('sizeCalculator', () => {
  it('Returns size calculator function', () => {
    const result = sizeCalculator({ startDate, endDate, direction: 'horizontal' });
    expect(result).toBeInstanceOf(Function);
  });

  it('Returns CSS "width" property for horizontal timeline', () => {
    const result = sizeCalculator({ startDate, endDate, direction: 'horizontal' })(exampleEvent);
    expect(result.width).toBeDefined();
  });

  it('Returns CSS "height" property for vertical timeline', () => {
    const result = sizeCalculator({ startDate, endDate, direction: 'vertical' })(exampleEvent);
    expect(result.height).toBeDefined();
  });
});
