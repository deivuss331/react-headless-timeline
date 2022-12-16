import { set } from 'date-fns';
import offsetCalculator from '../offsetCalculator';

const startDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }); // Today 00:00:00
const endDate = set(new Date(), { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 }); // Today 23:59:59
const exampleEvent = {
  startDate: set(new Date(), { hours: 10, minutes: 0, seconds: 30 }), // Today 10:00:30
  endDate: set(new Date(), { hours: 15, minutes: 30, seconds: 39 }), // Today 15:30:39
};

describe('offsetCalculator', () => {
  it('Returns offset calculator function', () => {
    const result = offsetCalculator({ startDate, endDate, direction: 'horizontal' });
    expect(result).toBeInstanceOf(Function);
  });

  it('Returns CSS "left" property for horizontal timeline', () => {
    const result = offsetCalculator({ startDate, endDate, direction: 'horizontal' })(exampleEvent.startDate);
    expect(result.left).toBeDefined();
  });

  it('Returns CSS "top" property for vertical timeline', () => {
    const result = offsetCalculator({ startDate, endDate, direction: 'vertical' })(exampleEvent.startDate);
    expect(result.top).toBeDefined();
  });
});
